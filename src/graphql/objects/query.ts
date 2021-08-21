import { intArg, list, nonNull, queryType, stringArg } from 'nexus'
import { searchForPack } from '@lib/pack/search'
import getTopPacks from '@lib/pack/top'
import prisma from '@lib/prisma'
import { countPacks } from '@lib/pack/count'
import { Pack } from './pack'
import { User } from './user'
import { countType } from './count'

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

    t.field('getUserPackCount', {
      args: { id: nonNull(stringArg()) },
      async resolve(parent, args, ctx) {
        return {
          count: await ctx.prisma.pack.count({
            where: { authorId: args.id },
          }),
        }
      },
      type: countType,
    })

    t.field('getTopPacks', {
      args: { skip: intArg(), take: intArg() },
      async resolve(parent, args) {
        return getTopPacks(args.take ?? 20, args.skip ?? undefined)
      },
      type: nonNull(list(nonNull(Pack))),
    })

    t.field('getPacksByName', {
      args: {
        name: nonNull(stringArg()),
        skip: intArg(),
        take: intArg(),
      },
      async resolve(parent, args) {
        return searchForPack(args.name, {
          skip: args.skip ?? undefined,
          take: args.take ?? undefined,
        })
      },
      type: nonNull(list(nonNull(Pack))),
    })

    t.field('getPacksByNameWithCount', {
      args: {
        name: nonNull(stringArg()),
        skip: intArg(),
        take: intArg(),
      },
      async resolve(parent, args) {
        const [packs, count] = await prisma.$transaction([
          searchForPack(args.name, {
            skip: args.skip ?? undefined,
            take: args.take ?? undefined,
          }),
          countPacks(args.name),
        ])

        return {
          packs,
          count,
        }
      },
      type: 'PacksWithCount',
    })
  },
})
