import { Language } from '@prisma/client'
import prisma from '@lib/prisma'

afterAll(async () => prisma.$disconnect())

describe('user', () => {
  it('has a username', async () => {
    const user = await prisma.user.findUnique({
      where: { username: 'cloudagon' },
    })
    expect(user?.username).toBe('cloudagon')
  })
})

describe('pack', () => {
  it('has the correct Language', async () => {
    const pack = await prisma.pack.findUnique({
      where: { name_authorId: { name: 'python-pack', authorId: 1 } },
    })
    expect(pack?.language).toBe(Language.python)
  })
})
