import {
  inputObjectType,
  intArg,
  mutationField,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { Language } from '@graphql/objects/language'
import { Pack } from '@graphql/objects/pack'
import { updatePackLanguage } from '@graphql/utils/update-language'
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
        return ctx.prisma.pack.findUnique({
          where: { id: parent.packId },
        }) as Prisma.Prisma__PackClient<PrismaPack>
      },
      type: Pack,
    })
    t.nonNull.dateTime('createdAt')
    t.nonNull.dateTime('updatedAt')
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

export const CreateSnippet = mutationField('createSnippet', {
  type: Snippet,
  args: {
    packId: nonNull(intArg()),
    snippet: nonNull(SnippetInput),
  },
  async resolve(parent, args, ctx) {
    const pack = await ctx.prisma.pack.findUnique({
      where: { id: args.packId },
      include: { snippets: true },
    })

    if (!pack?.snippets) return null

    const createdSnippet = await ctx.prisma.snippet.create({
      data: {
        packId: args.packId,
        ...args.snippet,
      },
    })

    updatePackLanguage(
      [createdSnippet, ...pack.snippets],
      args.packId,
      pack.language,
    )

    return createdSnippet
  },
})

export const DeleteSnippet = mutationField('deleteSnippet', {
  type: Snippet,
  args: {
    packId: nonNull(intArg()),
    id: nonNull(intArg()),
  },
  async resolve(parent, args, ctx) {
    const pack = await ctx.prisma.pack.findUnique({
      where: { id: args.packId },
      include: { snippets: true },
    })

    if (!pack?.snippets || pack?.snippets.length === 1) return null

    const deletedSnippet = await ctx.prisma.snippet.delete({
      where: { id: args.id },
    })

    // remove deleted snippet
    const deletedSnippetIndex = pack.snippets.findIndex((snippet) => {
      return snippet.id === deletedSnippet.id
    })

    const newPackSnippets = pack.snippets.slice()
    newPackSnippets.splice(deletedSnippetIndex, 1)

    updatePackLanguage(newPackSnippets, args.packId, pack.language)

    return deletedSnippet
  },
})

export const UpdateSnippetName = mutationField('updateSnippetName', {
  type: Snippet,
  args: {
    id: nonNull(intArg()),
    name: nonNull(stringArg()),
  },
  resolve(parent, args, ctx) {
    return ctx.prisma.snippet.update({
      where: { id: args.id },
      data: {
        name: args.name,
      },
    })
  },
})

export const UpdateSnippetCode = mutationField('updateSnippetCode', {
  type: Snippet,
  args: {
    id: nonNull(intArg()),
    code: nonNull(stringArg()),
  },
  resolve(parent, args, ctx) {
    return ctx.prisma.snippet.update({
      where: { id: args.id },
      data: {
        code: args.code,
      },
    })
  },
})
