import { Language as PrismaLanguageEnum } from '@prisma/client'
import { enumType } from 'nexus'

export const Language = enumType({
  name: 'Language',
  members: PrismaLanguageEnum,
})
