import * as Yup from 'yup'
import { Language } from '@prisma/client'
import validationErrors from '@lib/validation/error'
import alphanumericWithDashes, {
  alphanumerWithDashesErrorMessage,
} from '@lib/validation/alphanumeric-with-dashes'
import type { SnippetInput } from '@graphql-types'

export type PackFormInputs = {
  packName: string
  packShortDescription: string
  packLongDescription: string
  snippets: SnippetInput[]
}

export const packName = Yup.string()
  .required(validationErrors.required)
  .max(50, validationErrors.maxLength)
  .test(
    'characters are alphanumeric with dashes',
    alphanumerWithDashesErrorMessage,
    (val) => (val ? alphanumericWithDashes.test(val as string) : false),
  )

export const packShortDescription = Yup.string()
  .required(validationErrors.required)
  .max(255, validationErrors.maxLength)

export const packLongDescription = Yup.string().max(
  10000,
  validationErrors.maxLength,
)

export const snippet = Yup.object().shape({
  name: Yup.string()
    .required(validationErrors.required)
    .max(50, validationErrors.maxLength),
  code: Yup.string()
    .required(validationErrors.required)
    .max(5000, validationErrors.maxLength),
  language: Yup.string().oneOf(Object.values(Language)),
})

export const snippets = Yup.array()
  .required(validationErrors.required)
  .min(1, ({ min }) => `You must have at least ${min} snippet.`)
  .max(5, ({ max }) => `You can only have up to ${max} snippets.`)
  .of(snippet)

export const packFormSchema = Yup.object().shape({
  packName,
  packShortDescription,
  packLongDescription,
  snippets,
})
