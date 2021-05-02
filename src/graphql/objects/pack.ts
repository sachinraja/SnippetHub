import { Language } from './language'
import { Snippet } from './snippet'
import { User } from './user'
import { list, mutationField, nonNull, objectType, stringArg } from 'nexus'
import type {
  Prisma,
  Language as PrismaLanguage,
  User as PrismaUser,
} from '@prisma/client'

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
    shortDescription: nonNull(stringArg()),
    longDescription: stringArg(),
    snippets: nonNull(list(nonNull('SnippetInput'))),
  },
  resolve(parent, args, ctx) {
    const languageCounts = args.snippets.reduce((accu, snippet) => {
      if (!accu[snippet.language]) {
        accu[snippet.language] = 0
      }

      accu[snippet.language] += 1
      return accu
    }, {} as Record<PrismaLanguage, number>)

    const language = Object.entries(languageCounts).sort(
      ([, count1], [, count2]) => count2 - count1,
    )[0][0] as PrismaLanguage

    return ctx.prisma.pack.create({
      data: {
        authorId: 1,
        name: args.name,
        shortDescription: args.shortDescription,
        longDescription: args.longDescription ?? undefined,
        language,
        snippets: {
          create: args.snippets,
        },
      },
    })
  },
})
