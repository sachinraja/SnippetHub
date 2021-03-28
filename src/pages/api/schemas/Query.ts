import { enumType, nonNull, objectType, queryType, stringArg } from 'nexus'
import { enum_Snippet_language } from '@prisma/client'
import type { Prisma, User as UserType } from '@prisma/client'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('username')
    t.nonNull.list.field('snippets', {
      /* eslint-disable @typescript-eslint/no-use-before-define */
      type: nonNull(Snippet),
      resolve(root, __, ctx) {
        return ctx.prisma.snippet.findMany({
          where: { authorId: root.id },
        })
      },
    })
  },
})

export const Language = enumType({
  name: 'Language',
  members: enum_Snippet_language,
})

export const Snippet = objectType({
  name: 'Snippet',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('title')
    t.nonNull.string('description')
    t.nonNull.int('upvotes')
    t.nonNull.field('language', {
      type: Language,
    })
    t.nonNull.string('code')
    t.nonNull.int('authorId')
    t.nonNull.field('author', {
      type: User,
      resolve(root, __, ctx) {
        // user will not be null
        return <Prisma.Prisma__UserClient<UserType>>ctx.prisma.user.findUnique({
          where: { id: root.authorId },
        })
      },
    })
  },
})

export const Query = queryType({
  definition(t) {
    t.field('userByUsername', {
      type: User,
      args: { username: nonNull(stringArg()) },
      resolve(_, args, ctx) {
        return ctx.prisma.user.findUnique({
          where: { username: args.username },
        })
      },
    })
  },
})
