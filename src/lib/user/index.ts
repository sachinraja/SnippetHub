import prisma from '@lib/prisma'

export function getUser(username: string) {
  return prisma.user.findUnique({
    select: {
      gitHubId: true,
      id: true,
      username: true,
    },
    where: { username },
  })
}

export function getUserPacksAllData(authorId: number) {
  return prisma.pack.findMany({
    where: { authorId },
  })
}

interface GetUserPacksOptions {
  orderBy?: 'asc' | 'desc'
  skip?: number
  take?: number
}

export async function getUserPacks(
  authorId: number,
  options?: GetUserPacksOptions,
) {
  return prisma.pack.findMany({
    orderBy: { upvotes: options?.orderBy },
    select: {
      description: true,
      id: true,
      language: true,
      name: true,
      upvotes: true,
    },
    skip: options?.skip,
    take: options?.take,
    where: { authorId },
  })
}
