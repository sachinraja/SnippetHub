import prisma from '@lib/prisma'

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
