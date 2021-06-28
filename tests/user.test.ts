import prisma from '@lib/prisma'
import envConfig from 'src/config'
import type { User } from '@prisma/client'

beforeAll(() => prisma.$connect())
afterAll(() => prisma.$disconnect())

describe('user', () => {
  it('has a username', async () => {
    const expectedUsername = envConfig.get('gitHub.personalUsername')

    const user = (await prisma.user.findUnique({
      where: { username: expectedUsername },
    })) as User

    expect(user.username).toBe(expectedUsername)
  })
})
