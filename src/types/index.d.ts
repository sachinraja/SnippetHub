type UnwrapPromise<T> = T extends PromiseLike<infer U> ? U : T

type Direction = 'left' | 'right' | 'up' | 'down'

interface PrismaQueryOptions {
  skip?: number
  take?: number
  orderBy?: import('@prisma/client').Prisma.SortOrder
}
