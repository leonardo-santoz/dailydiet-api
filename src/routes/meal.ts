import { knex } from '../database'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { JwtPayload } from 'jsonwebtoken'

export async function mealRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { preValidation: [app.authenticate] },
    async (request, reply) => {
      const createMealSchema = z.object({
        name: z.string(),
        description: z.string(),
        is_in_diet: z.boolean(),
        time: z.string(), //TODO: convert to date
      })

      const { name, description, is_in_diet, time } = createMealSchema.parse(
        request.body
      )

      const contextUser = await request.jwtVerify<JwtPayload>()
      console.log({ contextUser })

      await knex('meals').insert({
        name,
        description,
        is_in_diet,
        time,
        user_id: contextUser.userId,
      })

      return reply.status(201).send()
    }
  )
}
