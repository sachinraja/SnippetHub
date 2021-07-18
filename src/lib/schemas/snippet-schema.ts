import * as Yup from 'yup'
import { Language } from '@prisma/client'
import configureYupLocale from '@lib/validation/configure-yup-locale'

configureYupLocale()

export const snippetName = Yup.string().required().max(50)

export const snippetCode = Yup.string().required().max(5000)

export const snippetLanguage = Yup.string().oneOf(Object.values(Language))

export const snippetSchema = Yup.object().shape({
  name: snippetName,
  code: snippetCode,
  language: snippetLanguage,
})
