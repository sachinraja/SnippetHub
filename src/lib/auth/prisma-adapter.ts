import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { PrismaClient } from '@prisma/client'
import type { Profile } from 'next-auth'
import type { AppOptions } from 'next-auth/internals'

const CustomPrismaAdapter = (prisma: PrismaClient) => {
  const originalAdpaterBuilder = PrismaAdapter(prisma)

  return {
    async getAdapter({ session, secret, ...appOptions }: AppOptions) {
      const originalAdapter = await originalAdpaterBuilder.getAdapter({
        session,
        secret,
        ...appOptions,
      })

      const createUser = async (
        profile: Profile & { username: string; emailVerified?: Date },
      ) => {
        return prisma.user.create({
          data: {
            name: profile.name,
            email: profile.email,
            image: profile.image,
            emailVerified: profile.emailVerified?.toISOString() ?? null,
            username: profile.username,
          },
        })
      }

      const returning = {
        ...originalAdapter,
        createUser,
      }

      return returning
    },
  }
}

export default CustomPrismaAdapter
