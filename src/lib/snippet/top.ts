import prisma from '@lib/prisma';

export default function getTopSnippets(take: number) {
  return prisma.snippet.findMany({
    take,
    orderBy: { upvotes: 'desc' },
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
  });
}
