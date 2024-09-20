import { knex } from '../database'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'

import { checkIfIsAdmin } from '../middlewares/check-if-is-admin'

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    const userSchema = z.object({
      fullName: z.string(),
      email: z.string(),
      password: z.string(),
      level: z.enum(['customer', 'admin']),
    })

    const { fullName, email, password, level } = userSchema.parse(request.body)

    const hashedPassword = bcrypt.hashSync(password, 5)

    await knex('users').insert({
      id: randomUUID(),
      fullName,
      email,
      password: hashedPassword,
      level,
    })

    return reply.status(201).send()
  })

  app.get(
    '/',
    { preValidation: [app.authenticate, checkIfIsAdmin] },
    async () => {
      const users = await knex('users').select()

      return { users }
    }
  )

  app.delete(
    '/:id',
    { preValidation: [app.authenticate, checkIfIsAdmin] },
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
