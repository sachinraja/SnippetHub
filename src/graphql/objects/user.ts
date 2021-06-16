import { nonNull, objectType } from 'nexus'
import { Pack } from '@graphql/objects/pack'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('username')
    t.string('image')
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
