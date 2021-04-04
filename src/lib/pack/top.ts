import prisma from '@lib/prisma'

export default function getTopPacks(take: number) {
  return prisma.pack.findMany({
    orderBy: { upvotes: 'desc' },
    select: {
      author: {
        select: {
          gitHubId: true,
          username: true,
        },
      },
      description: true,
      id: true,
      language: true,
      name: true,
      upvotes: true,
    },
    take,
  })
}
