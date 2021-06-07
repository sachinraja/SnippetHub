type UnwrapPromise<T> = T extends PromiseLike<infer U> ? U : T

type Direction = 'left' | 'right' | 'up' | 'down'

type ExtractProps<TComponentOrTProps> =
  TComponentOrTProps extends React.ComponentType<infer TProps>
    ? TProps
    : TComponentOrTProps

interface PrismaQueryOptions {
  skip?: number
  take?: number
  orderBy?: import('@prisma/client').Prisma.SortOrder
}
