import prisma from '@lib/prisma'
import type { PrismaQueryOptions } from 'src/types'
import type { User } from '@prisma/client'

export function getUser(username: string) {
  return prisma.user.findUnique({
    where: { username },
  })
}

export function getUserPacksAllData(authorId: number) {
  return prisma.pack.findMany({
    where: { authorId },
  })
}

export async function getUserPacks(author: User, options: PrismaQueryOptions) {
  return prisma.pack.findMany({
    ...options,
    orderBy: { upvotes: options.orderBy },
    select: {
      shortDescription: true,
      id: true,
      language: true,
      name: true,
      upvotes: true,
    },
    where: { authorId: author.id },
  })
}
