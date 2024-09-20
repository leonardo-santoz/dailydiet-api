import { FastifyReply, FastifyRequest } from 'fastify'

//TODO: globalize it
interface JwtPayload {
  id: string
  email: string
  level: string
}

export async function checkIfIsAdmin(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = await request.jwtVerify<JwtPayload>()

  if (user.level !== 'admin') return reply.status(403).send('Access denied!')
}
