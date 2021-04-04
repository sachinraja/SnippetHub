import prisma from '@lib/prisma'
import type { PrismaClient } from '@prisma/client'

export interface Context {
  prisma: PrismaClient
}

export const context = {
  prisma,
}
