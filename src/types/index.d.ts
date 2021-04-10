import type { Prisma } from '@prisma/client'

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

interface PrismaQueryOptions {
  skip?: number
  take?: number
  orderBy?: Prisma.SortOrder
}
