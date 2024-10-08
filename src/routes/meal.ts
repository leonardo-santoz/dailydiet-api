import { knex } from '../database'
import { z } from 'zod'
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

      const { userId } = await request.jwtVerify<JwtPayload>()

      await knex('meals').insert({
        id: randomUUID(),
        name,
        description,
        is_in_diet,
        time,
        user_id: userId,
      })

      return reply.status(201).send()
    }
  )

  app.get('/', { preValidation: [app.authenticate] }, async (request) => {
    const { userId } = await request.jwtVerify<JwtPayload>()

    const meals = await knex('meals').where('user_id', userId).select()

    return { meals }
  })

  app.get('/:id', { preValidation: [app.authenticate] }, async (request) => {
    const getMealSchema = await z.object({
      id: z.string().uuid(),
    })

    const { userId } = await request.jwtVerify<JwtPayload>()

    const { id } = getMealSchema.parse(request.params)

    const meal = await knex('meals')
      .where('user_id', userId)
      .andWhere('id', id)
      .select()

    return { meal }
  })

  app.get('/count', { preValidation: [app.authenticate] }, async (request) => {
    const { userId } = await request.jwtVerify<JwtPayload>()

    const mealsCount = await knex('meals')
      .where('user_id', userId)
      .count({ count: '*' })
      .first()

    return mealsCount
  })

  app.get(
    '/countNotInDiet',
    { preValidation: [app.authenticate] },
    async (request) => {
      const { userId } = await request.jwtVerify<JwtPayload>()

      const mealsCount = await knex('meals')
        .where('user_id', userId)
        .andWhere('is_in_diet', false)
        .count({ count: '*' })
        .first()

      return mealsCount
    }
  )

  app.get(
    '/countInDiet',
    { preValidation: [app.authenticate] },
    async (request) => {
      const { userId } = await request.jwtVerify<JwtPayload>()

      const mealsCount = await knex('meals')
        .where('user_id', userId)
        .andWhere('is_in_diet', true)
        .count({ count: '*' })
        .first()

      return mealsCount
    }
  )

  app.patch(
    '/:id',
    { preValidation: [app.authenticate] },
    async (request, reply) => {
      const updateMealSchema = z.object({
        name: z.string(),
        description: z.string(),
        is_in_diet: z.boolean(),
        time: z.string(), //TODO: convert to date
      })

      const { name, description, is_in_diet, time } = updateMealSchema.parse(
        request.body
      )

      const { userId } = await request.jwtVerify<JwtPayload>()
      const updated_at = new Date().toString() //TODO: review

      await knex('meals').update({
        name,
        description,
        is_in_diet,
        time,
        user_id: userId,
        updated_at,
      })

      return reply.status(200).send()
    }
  )

  app.delete(
    '/:id',
    { preValidation: [app.authenticate] },
    async (request, reply) => {
      const deleteMealSchema = await z.object({
        id: z.string().uuid(),
      })

      const { id } = deleteMealSchema.parse(request.params)

      const { userId } = await request.jwtVerify<JwtPayload>()

      await knex('meals').where('user_id', userId).andWhere('id', id).delete()

      return reply.status(200).send()
    }
  )
}
