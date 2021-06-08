import prisma from '@lib/prisma'

beforeAll(() => prisma.$connect())
afterAll(() => prisma.$disconnect())

describe('user', () => {
  it('has a username', async () => {
    const user = await prisma.user.findUnique({
      where: { username: 'cloudagon' },
    })
    expect(user?.username).toBe('cloudagon')
  })
})
