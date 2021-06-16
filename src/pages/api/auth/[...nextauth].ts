import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import envConfig from 'src/config'
import prisma from '@lib/prisma'
import type { User } from 'next-auth'

interface UserWithStringId extends User {
  id: string
}

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: envConfig.get('gitHub.clientId'),
      clientSecret: envConfig.get('gitHub.clientSecret'),
      profile(profile) {
        return {
          // @ts-expect-error id does exist
          id: profile.id.toString(),
          username: profile.login,
          bio: profile.bio,
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        } as UserWithStringId
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { jwt: true },
})
