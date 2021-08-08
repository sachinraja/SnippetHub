import prisma from '@lib/prisma'
import type { Prisma } from '.prisma/client'

export function countPacks(name?: string) {
  const where: Prisma.PackWhereInput = {
    name: { contains: name, mode: 'insensitive' },
  }

  return prisma.pack.count({
    where,
  })
}
