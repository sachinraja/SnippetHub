import * as Yup from 'yup'
import alphanumericWithDashes, {
  alphanumerWithDashesErrorMessage,
} from '@lib/validation/alphanumeric-with-dashes'
import configureYupLocale from '@lib/validation/configure-yup-locale'
import { snippetSchema } from './snippet-schema'
import type { SnippetInput } from '@graphql-types'

configureYupLocale()

export type PackFormInputs = {
  name: string
  shortDescription: string
  longDescription: string
  snippets: SnippetInput[]
}

export const packName = Yup.string()
  .required()
  .max(50)
  .test(
    'characters are alphanumeric with dashes',
    alphanumerWithDashesErrorMessage,
    (val) => (val ? alphanumericWithDashes.test(val as string) : false),
  )

export const packShortDescription = Yup.string().required().max(255)

export const packLongDescription = Yup.string().max(10000)

export const snippets = Yup.array()
  .required()
  .min(1, ({ min }) => `You must have at least ${min} snippet.`)
  .max(5, ({ max }) => `You can only have up to ${max} snippets.`)
  .of(snippetSchema)

export const packSchema = Yup.object().shape({
  name: packName,
  shortDescription: packShortDescription,
  longDescription: packLongDescription,
  snippets,
})
