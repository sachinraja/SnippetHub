import { objectType } from 'nexus'
import { User as NexusUser } from 'nexus-prisma'

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
