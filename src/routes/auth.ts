import { knex } from '../database'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { FastifyInstance } from 'fastify'

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', async (request, reply) => {
    const authLoginSchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = authLoginSchema.parse(request.body)

    const user = await knex('users').where('email', email).first()

    if (!user) return reply.status(404).send({ error: 'User not found' })

    const passwordIsValid = await bcrypt.compare(password, user.password)

    if (!passwordIsValid)
      return reply.status(404).send({ error: 'User or e-mail is invalid' })

    const token = app.jwt.sign(
      { userId: user.id, level: user.level },
      { expiresIn: '1h' }
    )

    return { token }
  })
}
