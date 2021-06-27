import { mutationField, nonNull, objectType, arg } from 'nexus'
import { User as NexusUser, Pack as NexusPack } from 'nexus-prisma'

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

export const Upvote = mutationField('upvote', {
  type: User,
  args: {
    packId: nonNull(arg(NexusPack.id)),
  },
  async resolve(parent, args, ctx) {
    const { user } = await ctx.prisma.userPackUpvote.create({
      data: {
        user: {
          connect: {
            id: ctx.session?.user.id,
          },
        },
        pack: {
          connect: {
            id: args.packId,
          },
        },
      },
      include: {
        user: true,
      },
    })

    return user
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
