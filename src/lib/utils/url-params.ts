import { User } from '.prisma/client'
import { getUser } from '@lib/user'
import prisma from '@lib/prisma'

export async function getAuthorFromParam(authorUsername: string) {
  if (!authorUsername.startsWith('@')) return null

  const username = authorUsername.slice(1)

  const user = await getUser(username)

  return user
}

export async function getPackFromParam(author: User, packName: string) {
  return prisma.pack.findUnique({
    where: {
      name_authorId: {
        authorId: author.id,
        name: packName,
      },
    },
    include: {
      snippets: true,
    },
  })
}
