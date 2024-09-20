import fastify from 'fastify'
import fastifyJwt from 'fastify-jwt'
import { env } from './env'

import { checkAuthenticatedRoutes } from './middlewares/check-authenticated-routes'

import { authRoutes } from './routes/auth'
import { userRoutes } from './routes/user'
import { mealRoutes } from './routes/meal'

export const app = fastify()
;(async () => {
  await checkAuthenticatedRoutes(app)
})()

app.register(fastifyJwt, { secret: env.SECRET_KEY })

app.register(authRoutes, { prefix: 'auth' })
app.register(userRoutes, { prefix: 'users' })
app.register(mealRoutes, { prefix: 'meals' })
