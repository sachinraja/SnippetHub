import { getUser } from '@lib/user'
import prisma from '@lib/prisma'
import type { User } from '@prisma/client'

export async function getAuthorFromParam(authorUsername: string) {
  if (!authorUsername.startsWith('@')) return null

  const username = authorUsername.slice(1)

  return getUser(username)
}

export async function getPackFromParam(author: User, packName: string) {
  const pack = await prisma.pack.findUnique({
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

  if (!pack) return null

  const upvoted = Boolean(
    await prisma.userPackUpvote.findUnique({
      where: {
        userId_packId: {
          userId: author.id,
          packId: pack.id,
        },
      },
    }),
  )

  return { ...pack, upvoted }
}
