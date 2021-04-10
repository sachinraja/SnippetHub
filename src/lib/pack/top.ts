import prisma from '@lib/prisma'

export default function getTopPacks(take: number, skip?: number) {
  return prisma.pack.findMany({
    skip,
    take,
    include: {
      author: true,
    },
    orderBy: { upvotes: 'desc' },
  })
}
