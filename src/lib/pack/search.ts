import prisma from '@lib/prisma'
import type { PrismaQueryOptions } from 'src/types'

export function searchForPack(name: string, options?: PrismaQueryOptions) {
  return prisma.pack.findMany({
    skip: options?.skip,
    take: options?.take,
    include: {
      author: true,
    },
    orderBy: { upvotes: 'desc' },
    where: { name: { contains: name, mode: 'insensitive' } },
  })
}
