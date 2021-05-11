import * as Yup from 'yup'
import { packFormSchema, snippet } from '@lib/schemas/pack-schema'
import type { PackFormInputs } from '@lib/schemas/pack-schema'
import type { SnippetInput } from '@graphql/queries/create-pack.graphql'

export type PackEditFormInputs = PackFormInputs & { newSnippet: SnippetInput }

export const packEditFormSchema = packFormSchema.required().concat(
  Yup.object()
    .shape({
      newSnippet: snippet,
    })
    .required(),
)
