import { knex } from '../database'
import { z } from 'zod'
import { env } from '../env'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { FastifyInstance } from 'fastify'

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', async (request) => {
    const authLoginSchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = authLoginSchema.parse(request.body)

    const user = await knex('users').where('email', email).select()

    if (!user) throw new Error('user not found')

    const passwordIsValid = await bcrypt.compare(password, user.password)

    if (!passwordIsValid) throw new Error('user or password is not valid')

    const token = jwt.sign({ userId: user.id }, env.SECRET_KEY, {
      expiresIn: '1h',
    })

    return { token }
  })
}
