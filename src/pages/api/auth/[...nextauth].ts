import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextApiHandler } from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import envConfig from 'src/config'
import prisma from '@lib/prisma'
import { getUserUsername } from '@lib/schemas/user-schema'
import type { Profile } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

const userUsername = getUserUsername()

const handler: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.GitHub({
        clientId: envConfig.get('gitHub.clientId'),
        clientSecret: envConfig.get('gitHub.clientSecret'),
        async profile(profile: Profile & GitHubFields) {
          const { requestedUsername } = parseCookies(
            { req },
            {
              path: '/',
            },
          )

          destroyCookie({ res }, 'requestedUsername', {
            path: '/',
          })

          return {
            id: profile.id.toString(),
            username: requestedUsername,
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
    secret: envConfig.get('jwt.secret'),
    jwt: {
      signingKey: envConfig.get('jwt.signingPrivateKey'),
    },
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
      async signIn(user) {
        // will be undefined if user is signing in for the first time (yes, this is hacky)
        if (!user.createdAt) {
          try {
            await userUsername.validate(user.username)
          } catch {
            return false
          }
        }

        return true
      },
    },
    pages: {
      signIn: '/login',
    },
  })

export default handler
