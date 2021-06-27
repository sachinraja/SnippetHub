import prisma from '@lib/prisma'
import type { User } from '@prisma/client'

beforeAll(() => prisma.$connect())
afterAll(() => prisma.$disconnect())

describe('user', () => {
  it('has a username', async () => {
    const user = (await prisma.user.findUnique({
      where: { username: 'sachinraja' },
    })) as User

    expect(user.username).toBe('sachinraja')
  })
})
