import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchQueryParams = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchQueryParams.parse(request.body)

  const searchService = makeSearchGymsService()

  const { gyms } = await searchService.execute({
    query,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
