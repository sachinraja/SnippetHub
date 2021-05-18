import Adapters from 'next-auth/adapters'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import envConfig from 'src/config'
import prisma from '@lib/prisma'

export default NextAuth({
  providers: [Providers.GitHub(envConfig.get('gitHub'))],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  session: { jwt: true },
})
