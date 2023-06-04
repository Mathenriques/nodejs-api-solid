import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileService } from '@/services/get-user-profile'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(inMemoryUsersRepository)
  })

  it('Should get user profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('Jhon Doe')
  })

  it('Should not be able to get user profile with wrong id', async () => {
    expect(() =>
      sut.execute({ userId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
