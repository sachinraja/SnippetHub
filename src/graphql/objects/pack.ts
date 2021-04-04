import { Language } from './language'
import { Prisma, User as PrismaUser } from '.prisma/client'
import { Snippet } from './snippet'
import { User } from './user'
import { list, mutationField, nonNull, objectType, stringArg } from 'nexus'

export const Pack = objectType({
  name: 'Pack',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.nonNull.field('language', {
      type: Language,
    })
    t.nonNull.int('upvotes')
    t.nonNull.list.field('snippets', {
      resolve(root, __, ctx) {
        return ctx.prisma.snippet.findMany({
          where: { packId: root.id },
        })
      },
      type: nonNull(Snippet),
    })
    t.nonNull.int('authorId')
    t.nonNull.field('author', {
      resolve(root, __, ctx) {
        return <Prisma.Prisma__UserClient<PrismaUser>>(
          ctx.prisma.user.findUnique({
            where: { id: root.authorId },
          })
        )
      },
      type: User,
    })
  },
})

export const PackMutation = mutationField('createPack', {
  type: Pack,
  args: {
    name: nonNull(stringArg()),
    description: nonNull(stringArg()),
    snippets: nonNull(list(nonNull('SnippetInput'))),
  },
  resolve(root, args, ctx) {
    return ctx.prisma.pack.create({
      data: {
        authorId: 1,
        name: args.name,
        description: args.description,
        snippets: {
          create: args.snippets,
        },
      },
    })
  },
})
