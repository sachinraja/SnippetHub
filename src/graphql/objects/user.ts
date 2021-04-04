import { Pack } from './pack'
import { nonNull, objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('username')
    t.string('bio')
    t.list.field('packs', {
      resolve(root, __, ctx) {
        return ctx.prisma.pack.findMany({
          where: { authorId: root.id },
        })
      },
      type: nonNull(Pack),
    })
  },
})
