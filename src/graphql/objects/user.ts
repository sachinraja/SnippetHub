import { mutationField, nonNull, objectType, arg } from 'nexus'
import { User as NexusUser, Pack as NexusPack } from 'nexus-prisma'
import NotLoggedInError from '@graphql/utils/not-logged-in-error'
import { Pack } from './pack'

export const User = objectType({
  name: NexusUser.$name,
  definition(t) {
    t.field(NexusUser.id)
    t.field(NexusUser.username)
    t.field(NexusUser.image)
    t.field(NexusUser.bio)
    t.field(NexusUser.packs)
    t.field(NexusUser.createdAt)
    t.field(NexusUser.updatedAt)
  },
})

export const CreatePackUpvote = mutationField('createPackUpvote', {
  type: Pack,
  args: {
    packId: nonNull(arg(NexusPack.id)),
  },
  async resolve(parent, args, ctx) {
    if (!ctx.session) throw NotLoggedInError

    const [, { pack }] = await ctx.prisma.$transaction([
      ctx.prisma.pack.update({
        where: { id: args.packId },
        data: {
          upvotes: {
            increment: 1,
          },
        },
      }),

      ctx.prisma.userPackUpvote.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          pack: {
            connect: {
              id: args.packId,
            },
          },
        },
        include: {
          pack: true,
        },
      }),
    ])

    return pack
  },
})

export const DeletePackUpvote = mutationField('deletePackUpvote', {
  type: Pack,
  args: {
    packId: nonNull(arg(NexusPack.id)),
  },
  async resolve(parent, args, ctx) {
    if (!ctx.session) throw NotLoggedInError

    const [, { pack }] = await ctx.prisma.$transaction([
      ctx.prisma.pack.update({
        where: { id: args.packId },
        data: {
          upvotes: {
            decrement: 1,
          },
        },
      }),

      ctx.prisma.userPackUpvote.delete({
        where: {
          userId_packId: {
            userId: ctx.session.user.id,
            packId: args.packId,
          },
        },
        include: {
          pack: true,
        },
      }),
    ])

    return pack
  },
})

export const UpdateUserBio = mutationField('updateUserBio', {
  type: User,
  args: {
    bio: nonNull(arg(NexusUser.bio)),
  },
  resolve(parent, args, ctx) {
    return ctx.prisma.user.update({
      where: { id: ctx.session?.user.id },
      data: {
        bio: args.bio,
      },
    })
  },
})
