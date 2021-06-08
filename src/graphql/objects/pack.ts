import {
  intArg,
  list,
  mutationField,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { Language } from '@graphql/objects/language'
import { getLanguageFromSnippets } from '@graphql/utils/update-language'
import type { Prisma, User as PrismaUser } from '@prisma/client'

export const Pack = objectType({
  name: 'Pack',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.int('authorId')
    t.nonNull.string('name')
    t.nonNull.string('shortDescription')
    t.string('longDescription')
    t.nonNull.field('language', {
      type: Language,
    })
    t.nonNull.int('upvotes')
    t.nonNull.list.field('snippets', {
      resolve(parent, args, ctx) {
        return ctx.prisma.snippet.findMany({
          where: { packId: parent.id },
        })
      },
      type: nonNull('Snippet'),
    })
    t.nonNull.field('author', {
      resolve(parent, args, ctx) {
        return ctx.prisma.user.findUnique({
          where: { id: parent.authorId },
        }) as Prisma.Prisma__UserClient<PrismaUser>
      },
      type: 'User',
    })
    t.nonNull.dateTime('createdAt')
    t.nonNull.dateTime('updatedAt')
  },
})

export const UpdatePackName = mutationField('updatePackName', {
  type: Pack,
  args: {
    id: nonNull(intArg()),
    name: nonNull(stringArg()),
  },
  resolve(parent, args, ctx) {
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
      id: nonNull(intArg()),
      shortDescription: nonNull(stringArg()),
    },
    resolve(parent, args, ctx) {
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
      id: nonNull(intArg()),
      longDescription: nonNull(stringArg()),
    },
    resolve(parent, args, ctx) {
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
    name: nonNull(stringArg()),
    shortDescription: nonNull(stringArg()),
    longDescription: stringArg(),
    snippets: nonNull(list(nonNull('SnippetInput'))),
  },
  resolve(parent, args, ctx) {
    return ctx.prisma.pack.create({
      data: {
        authorId: 1,
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
