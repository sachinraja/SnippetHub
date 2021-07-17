import * as Yup from 'yup'
import { packSchema } from './pack-schema'
import { snippetSchema } from './snippet-schema'
import type { SnippetInput } from '@graphql-types'
import type { PackFormInputs } from './pack-schema'

export type PackEditFormInputs = PackFormInputs & { newSnippet: SnippetInput }

export const packEditFormSchema = packSchema.required().concat(
  Yup.object()
    .shape({
      newSnippet: snippetSchema,
    })
    .required(),
)
