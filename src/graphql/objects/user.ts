import { nonNull, objectType } from 'nexus'
import { Pack } from '@graphql/objects/pack'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.int('gitHubId')
    t.nonNull.string('username')
    t.string('bio')
    t.list.field('packs', {
      resolve(parent, args, ctx) {
        return ctx.prisma.pack.findMany({
          where: { authorId: parent.id },
        })
      },
      type: nonNull(Pack),
    })
    t.nonNull.dateTime('createdAt')
    t.nonNull.dateTime('updatedAt')
  },
})
