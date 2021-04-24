import { getUser } from '@lib/user'
import prisma from '@lib/prisma'
import type { User } from '@prisma/client'

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
