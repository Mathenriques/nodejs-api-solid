import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historyQueryParams = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyQueryParams.parse(request.query)

  const historyService = makeFetchUserCheckInsHistoryService()

  const { checkIns } = await historyService.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkIns,
  })
}
