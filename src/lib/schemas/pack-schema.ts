import * as Yup from 'yup'
import alphanumericWithDashes, {
  alphanumericWithDashesErrorMessage,
} from '@lib/validation/alphanumeric-with-dashes'
import { getSnippetSchema } from './snippet-schema'
import type { SnippetInput } from '@graphql-types'

export type PackFormInputs = {
  name: string
  shortDescription: string
  longDescription: string
  snippets: SnippetInput[]
}

export const getPackName = () =>
  Yup.string()
    .required()
    .max(50)
    .test(
      'characters are alphanumeric with dashes',
      alphanumericWithDashesErrorMessage,
      (val) => (val ? alphanumericWithDashes.test(val as string) : false),
    )

export const getPackShortDescription = () => Yup.string().required().max(255)

export const getPackLongDescription = () => Yup.string().max(10000)

export const getSnippets = () =>
  Yup.array()
    .required()
    .min(1, ({ min }) => `You must have at least ${min} snippet.`)
    .max(5, ({ max }) => `You can only have up to ${max} snippets.`)
    .of(getSnippetSchema())

export const getPackSchema = () =>
  Yup.object().shape({
    name: getPackName(),
    shortDescription: getPackShortDescription(),
    longDescription: getPackLongDescription(),
    snippets: getSnippets(),
  })
