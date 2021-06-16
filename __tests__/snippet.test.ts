import prisma from '@lib/prisma'
import type { Pack, Snippet, User } from '@prisma/client'

let pack:
  | (Pack & {
      snippets: Snippet[]
    })
  | null

beforeAll(async () => {
  await prisma.$connect()

  const author = (await prisma.user.findUnique({
    where: { username: 'sachinraja' },
  })) as User

  pack = await prisma.pack.findUnique({
    where: { name_authorId: { name: 'python-pack', authorId: author.id } },
    include: { snippets: true },
  })
})

afterAll(() => prisma.$disconnect())

describe('snippet', () => {
  it('exists under python-pack', () =>
    expect(pack?.snippets[0].name).toBe('Import PIL'))
})
