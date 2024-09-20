import { knex } from '../database'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    const userSchema = z.object({
      fullName: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { fullName, email, password } = userSchema.parse(request.body)

    const hashedPassword = bcrypt.hashSync(password, 5)

    await knex('users').insert({
      id: randomUUID(),
      fullName,
      email,
      password: hashedPassword,
    })

    return reply.status(201).send()
  })

  app.get('/', { preValidation: [app.authenticate] }, async () => {
    const users = await knex('users').select()

    return { users }
  })

  app.delete(
    '/:id',
    { preValidation: [app.authenticate] },
    async (request, reply) => {
      const deleteUserParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = deleteUserParamsSchema.parse(request.params)

      await knex('users').where('id', id).delete()

      return reply.status(200).send()
    }
  )
}
