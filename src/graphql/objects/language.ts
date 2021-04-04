import { enumType } from 'nexus'
import { enum_Pack_language } from '.prisma/client'

export const Language = enumType({
  name: 'Language',
  members: enum_Pack_language,
})
