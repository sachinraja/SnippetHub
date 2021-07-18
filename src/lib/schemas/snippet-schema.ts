import * as Yup from 'yup'
import { Language } from '@prisma/client'

export const getSnippetName = () => Yup.string().required().max(50)

export const getSnippetCode = () => Yup.string().required().max(5000)

export const getSnippetLanguage = () =>
  Yup.string().oneOf(Object.values(Language))

export const getSnippetSchema = () =>
  Yup.object().shape({
    name: getSnippetName(),
    code: getSnippetCode(),
    language: getSnippetLanguage(),
  })
