import { arg, list, mutationField, nonNull, objectType } from 'nexus'
import { Pack as NexusPack } from 'nexus-prisma'
import { getLanguageFromSnippets } from '@graphql/utils/update-language'
import {
  getPackShortDescription,
  getPackName,
  getPackLongDescription,
  getPackSchema,
} from '@lib/schemas/pack-schema'
import NotLoggedInError from '@graphql/utils/not-logged-in-error'
import { SnippetInput } from './snippet'

const packName = getPackName()
const packShortDescription = getPackShortDescription()
const packLongDescription = getPackLongDescription()
const packSchema = getPackSchema()

export const Pack = objectType({
  name: NexusPack.$name,
  definition(t) {
    t.field(NexusPack.id)
    t.field(NexusPack.authorId)
    t.field(NexusPack.name)
    t.field(NexusPack.shortDescription)
    t.field(NexusPack.longDescription)
    t.field(NexusPack.language)
    t.field(NexusPack.upvotes)
    t.field(NexusPack.snippets)
    t.field(NexusPack.author)
    t.field(NexusPack.createdAt)
    t.field(NexusPack.updatedAt)
  },
})

export const PacksWithCount = objectType({
  name: 'PacksWithCount',
  definition(t) {
    t.field('packs', {
      type: nonNull(list(nonNull(Pack))),
    })

    t.nonNull.int('count')
  },
})

export const UpdatePackName = mutationField('updatePackName', {
  type: Pack,
  args: {
    id: nonNull(arg(NexusPack.id)),
    name: nonNull(arg(NexusPack.name)),
  },
  async resolve(parent, args, ctx) {
    await packName.validate(args.name)

    return ctx.prisma.pack.update({
      where: { id: args.id },
      data: {
        name: args.name,
      },
    })
  },
})

export const UpdatePackShortDescription = mutationField(
  'updatePackShortDescription',
  {
    type: Pack,
    args: {
      id: nonNull(arg(NexusPack.id)),
      shortDescription: nonNull(arg(NexusPack.shortDescription)),
    },
    async resolve(parent, args, ctx) {
      await packShortDescription.validate(args.shortDescription)

      return ctx.prisma.pack.update({
        where: { id: args.id },
        data: {
          shortDescription: args.shortDescription,
        },
      })
    },
  },
)

export const UpdatePackLongDescription = mutationField(
  'updatePackLongDescription',
  {
    type: Pack,
    args: {
      id: nonNull(arg(NexusPack.id)),
      longDescription: nonNull(arg(NexusPack.longDescription)),
    },
    async resolve(parent, args, ctx) {
      await packLongDescription.validate(args.longDescription)

      return ctx.prisma.pack.update({
        where: { id: args.id },
        data: {
          longDescription: args.longDescription,
        },
      })
    },
  },
)

export const CreatePack = mutationField('createPack', {
  type: Pack,
  args: {
    name: nonNull(arg(NexusPack.name)),
    shortDescription: nonNull(arg(NexusPack.shortDescription)),
    longDescription: arg(NexusPack.longDescription),
    snippets: nonNull(list(nonNull(SnippetInput))),
  },
  async resolve(parent, args, ctx) {
    if (!ctx.session) throw NotLoggedInError

    await packSchema.validate(args)

    const userPacksCount = await ctx.prisma.pack.count({
      where: { authorId: ctx.session.user.id },
    })

    if (userPacksCount >= 20)
      throw new Error('You can only have up to 20 packs.')

    return ctx.prisma.pack.create({
      data: {
        author: {
          connect: {
            id: ctx.session.user.id,
          },
        },
        name: args.name,
        shortDescription: args.shortDescription,
        longDescription: args.longDescription ?? undefined,
        language: getLanguageFromSnippets(args.snippets),
        snippets: {
          create: args.snippets,
        },
      },
    })
  },
})

export const DeletePack = mutationField('deletePack', {
  type: Pack,
  args: {
    id: nonNull(arg(NexusPack.id)),
  },
  resolve(parent, args, ctx) {
    return ctx.prisma.pack.delete({
      where: { id: args.id },
    })
  },
})
