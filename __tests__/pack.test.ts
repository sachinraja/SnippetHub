import { Language } from '@prisma/client'
import prisma from '@lib/prisma'

beforeAll(() => prisma.$connect())
afterAll(() => prisma.$disconnect())

describe('pack', () => {
  it('has the correct Language', async () => {
    const pack = await prisma.pack.findUnique({
      where: { name_authorId: { name: 'python-pack', authorId: 1 } },
    })
    expect(pack?.language).toBe(Language.python)
  })
})
