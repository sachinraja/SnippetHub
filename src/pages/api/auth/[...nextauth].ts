import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import envConfig from 'src/config'
import prisma from '@lib/prisma'
import type { JWT } from 'next-auth/jwt'
import type { Profile } from 'next-auth'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: envConfig.get('gitHub.clientId'),
      clientSecret: envConfig.get('gitHub.clientSecret'),
      profile(profile: Profile & GitHubFields) {
        return {
          id: profile.id.toString(),
          username: profile.login,
          bio: profile.bio,
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { jwt: true },
  callbacks: {
    jwt(token, user, account) {
      if (account?.accessToken) token.accessToken = account.accessToken
      if (user) {
        token.user = {
          id: user.id,
          username: user.username,
        }
      }

      return token
    },
    session(session, token: JWT) {
      session.accessToken = token.accessToken
      session.user = {
        ...session.user,
        ...token.user,
      }

      return session
    },
  },
})
