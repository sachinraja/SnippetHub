import { Language } from './language'
import { Pack } from './pack'
import { inputObjectType, objectType } from 'nexus'
import type { Prisma, Pack as PrismaPack } from '@prisma/client'

export const Snippet = objectType({
  name: 'Snippet',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('code')
    t.nonNull.int('packId')
    t.nonNull.field('language', {
      type: Language,
    })
    t.nonNull.field('pack', {
      resolve(parent, args, ctx) {
        return <Prisma.Prisma__PackClient<PrismaPack>>(
          ctx.prisma.pack.findUnique({
            where: { id: parent.packId },
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
    t.nonNull.field('language', {
      type: Language,
    })
  },
})
