import { arg, inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { Snippet as NexusSnippet } from 'nexus-prisma'
import { updatePackLanguage } from '@graphql/utils/update-language'

export const Snippet = objectType({
  name: NexusSnippet.$name,
  definition(t) {
    t.field(NexusSnippet.id)
    t.field(NexusSnippet.name)
    t.field(NexusSnippet.code)
    t.field(NexusSnippet.packId)
    t.field(NexusSnippet.language)
    t.field(NexusSnippet.pack)
    t.field(NexusSnippet.createdAt)
    t.field(NexusSnippet.updatedAt)
  },
})

export const SnippetInput = inputObjectType({
  name: 'SnippetInput',
  definition(t) {
    t.field(NexusSnippet.name)
    t.field(NexusSnippet.code)
    t.field(NexusSnippet.language)
  },
})

export const CreateSnippet = mutationField('createSnippet', {
  type: Snippet,
  args: {
    packId: nonNull(arg(NexusSnippet.packId)),
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
    packId: nonNull(arg(NexusSnippet.packId)),
    id: nonNull(arg(NexusSnippet.id)),
  },
  async resolve(parent, args, ctx) {
    const pack = await ctx.prisma.pack.findUnique({
      where: { id: args.packId },
      include: { snippets: true },
    })

    if (!pack) throw new Error('Pack does not exist.')
    if (pack.snippets.length === 1)
      throw new Error(
        'You cannot delete a snippet if the pack has only one snippet left.',
      )

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
    id: nonNull(arg(NexusSnippet.id)),
    name: nonNull(arg(NexusSnippet.name)),
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
    id: nonNull(arg(NexusSnippet.id)),
    code: nonNull(arg(NexusSnippet.code)),
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
