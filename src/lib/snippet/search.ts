import prisma from '@lib/prisma'

export default function searchForSnippet(
  title: string,
  orderBy?: 'desc' | 'asc',
) {
  return prisma.snippet.findMany({
    where: { title: { contains: title, mode: 'insensitive' } },
    orderBy: { upvotes: orderBy },
    select: {
      id: true,
      title: true,
      upvotes: true,
      description: true,
      language: true,
      author: {
        select: {
          username: true,
          gitHubId: true,
        },
      },
    },
  })
}
