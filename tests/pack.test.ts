import { Language } from '@prisma/client'
import prisma from '@lib/prisma'
import envConfig from 'src/config'
import type { User } from '@prisma/client'

beforeAll(() => prisma.$connect())
afterAll(() => prisma.$disconnect())

describe('pack', () => {
  it('has the correct Language', async () => {
    const author = (await prisma.user.findUnique({
      where: { username: envConfig.get('gitHub.personalUsername') },
    })) as User

    const pack = await prisma.pack.findUnique({
      where: { name_authorId: { name: 'python-pack', authorId: author.id } },
    })
    expect(pack?.language).toBe(Language.python)
  })
})
