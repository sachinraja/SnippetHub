import { User } from './user'
import { nonNull, queryType, stringArg } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.field('userByUsername', {
      args: { username: nonNull(stringArg()) },
      resolve(_, args, ctx) {
        return ctx.prisma.user.findUnique({
          where: { username: args.username },
        })
      },
      type: User,
    })
  },
})
