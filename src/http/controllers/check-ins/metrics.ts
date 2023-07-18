import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function metric(request: FastifyRequest, reply: FastifyReply) {
  const metricService = makeGetUserMetricsService()

  const { checkInsCount } = await metricService.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
