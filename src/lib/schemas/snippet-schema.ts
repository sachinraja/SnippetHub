import * as Yup from 'yup'
import { Language } from '@prisma/client'
import validationErrors from '@lib/validation/error'

export const snippetName = Yup.string()
  .required(validationErrors.required)
  .max(50, validationErrors.maxLength)

export const snippetCode = Yup.string()
  .required(validationErrors.required)
  .max(5000, validationErrors.maxLength)

export const snippetLanguage = Yup.string().oneOf(Object.values(Language))

export const snippetSchema = Yup.object().shape({
  name: snippetName,
  code: snippetCode,
  language: snippetLanguage,
})
