import prisma from '@lib/prisma';

export function getUser(username: string) {
  return prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      gitHubId: true,
      username: true,
    },
  });
}

export function getUserSnippetsAllData(authorId: number) {
  return prisma.snippet.findMany({
    where: { authorId },
  });
}

interface GetUserSnippetsOptions {
  skip?: number;
  take?: number;
  orderBy?: 'asc' | 'desc';
}
export async function getUserSnippets(
  authorId: number,
  options?: GetUserSnippetsOptions,
) {
  return prisma.snippet.findMany({
    skip: options?.skip,
    take: options?.take,
    where: { authorId },
    orderBy: { upvotes: options?.orderBy },
    select: {
      id: true,
      title: true,
      upvotes: true,
      description: true,
      language: true,
    },
  });
}
