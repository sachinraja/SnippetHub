import { Language } from './language'
import { Snippet } from './snippet'
import { User } from './user'
import { list, mutationField, nonNull, objectType, stringArg } from 'nexus'
import type { Prisma, User as PrismaUser } from '@prisma/client'

export const Pack = objectType({
  name: 'Pack',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.int('authorId')
    t.nonNull.string('name')
    t.nonNull.string('description')
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
      type: nonNull(Snippet),
    })
    t.nonNull.field('author', {
      resolve(parent, args, ctx) {
        return <Prisma.Prisma__UserClient<PrismaUser>>(
          ctx.prisma.user.findUnique({
            where: { id: parent.authorId },
          })
        )
      },
      type: User,
    })
    t.nonNull.dateTime('createdAt')
    t.nonNull.dateTime('updatedAt')
  },
})

export const CreatePack = mutationField('createPack', {
  type: Pack,
  args: {
    name: nonNull(stringArg()),
    description: nonNull(stringArg()),
    language: nonNull(Language),
    snippets: nonNull(list(nonNull('SnippetInput'))),
  },
  resolve(parent, args, ctx) {
    return ctx.prisma.pack.create({
      data: {
        authorId: 1,
        name: args.name,
        description: args.description,
        language: args.language,
        snippets: {
          create: args.snippets,
        },
      },
    })
  },
})
