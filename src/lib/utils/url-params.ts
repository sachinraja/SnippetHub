import { getUser } from '@lib/user'
import prisma from '@lib/prisma'
import type { Pack, User } from '@prisma/client'

export async function getAuthorFromParam(authorUsername: User['username']) {
  if (!authorUsername.startsWith('@')) return null

  const username = authorUsername.slice(1)

  return getUser(username)
}

export async function getPackFromParam(
  author: User,
  packName: Pack['name'],
  userId?: User['id'],
) {
  const includeArgs = userId
    ? {
        snippets: true,
        userPackUpvotes: {
          where: {
            userId,
          },
        },
      }
    : {
        snippets: true,
      }

  const pack = await prisma.pack.findUnique({
    where: {
      name_authorId: {
        authorId: author.id,
        name: packName,
      },
    },
    include: includeArgs,
  })

  if (!pack) return null

  const upvoted = pack.userPackUpvotes && pack.userPackUpvotes.length !== 0

  return { ...pack, upvoted }
}
