import request from 'supertest'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Jhon Doe',
    email: 'jhondoe@example.com',
    password: '1234567',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jhondoe@example.com',
    password: '1234567',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
