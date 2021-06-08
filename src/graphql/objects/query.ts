import { intArg, list, nonNull, queryType, stringArg } from 'nexus'
import { Pack } from '@graphql/objects/pack'
import { User } from '@graphql/objects/user'
import { searchForPack } from '@lib/pack/search'
import getTopPacks from '@lib/pack/top'

export const Query = queryType({
  definition(t) {
    t.field('userByUsername', {
      args: { username: nonNull(stringArg()) },
      resolve(parent, args, ctx) {
        return ctx.prisma.user.findUnique({
          where: { username: args.username },
        })
      },
      type: User,
    })
    t.field('getTopPacks', {
      args: { skip: intArg(), take: intArg() },
      async resolve(parent, args) {
        return getTopPacks(args.take ?? 20, args.skip ?? undefined)
      },
      type: nonNull(list(nonNull(Pack))),
    })
    t.field('packByName', {
      args: {
        name: nonNull(stringArg()),
        skip: intArg(),
        take: intArg(),
      },
      async resolve(parent, args) {
        const packs = await searchForPack(args.name, {
          skip: args.skip ?? undefined,
          take: args.take ?? undefined,
        })

        return packs
      },
      type: list(nonNull(Pack)),
    })
  },
})
