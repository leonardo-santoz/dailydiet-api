import { knex } from '../database'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    console.log('body', request.body)
    const userSchema = z.object({
      fullName: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { fullName, email, password } = userSchema.parse(request.body)

    const hashedPassword = bcrypt.hash(password, 5)

    await knex('users').insert({
      id: randomUUID(),
      fullName,
      email,
      password: hashedPassword,
    })

    return reply.status(201).send()
  })
}
