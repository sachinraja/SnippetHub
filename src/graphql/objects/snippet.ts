import { Pack } from './pack'
import { Prisma, Pack as PrismaPack } from '.prisma/client'
import { inputObjectType, objectType } from 'nexus'

export const Snippet = objectType({
  name: 'Snippet',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('code')
    t.nonNull.int('packId')
    t.nonNull.field('pack', {
      resolve(root, __, ctx) {
        return <Prisma.Prisma__PackClient<PrismaPack>>(
          ctx.prisma.pack.findUnique({
            where: { id: root.packId },
          })
        )
      },
      type: Pack,
    })
  },
})

export const SnippetInput = inputObjectType({
  name: 'SnippetInput',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.string('code')
  },
})
