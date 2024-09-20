import fastify from 'fastify'
import fastifyJwt from 'fastify-jwt'
import { env } from './env'

import { authRoutes } from './routes/auth'
import { userRoutes } from './routes/user'
import { mealRoutes } from './routes/meal'

export const app = fastify()

app.register(fastifyJwt, { secret: env.SECRET_KEY })

app.register(authRoutes, { prefix: 'auth' })
app.register(userRoutes, { prefix: 'users' })
app.register(mealRoutes, { prefix: 'meals' })


