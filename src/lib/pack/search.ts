import prisma from '@lib/prisma'

export default function searchForPack(name: string, orderBy?: 'desc' | 'asc') {
  return prisma.pack.findMany({
    orderBy: { upvotes: orderBy },
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
    where: { name: { contains: name, mode: 'insensitive' } },
  })
}
