import { getSession } from 'next-auth/client'
import prisma from '@lib/prisma'
import type { NextApiRequest } from 'next'

export type Context = UnwrapPromise<ReturnType<typeof context>>

export const context = async ({ req }: { req: NextApiRequest }) => {
  return { prisma, session: await getSession({ req }) }
}
