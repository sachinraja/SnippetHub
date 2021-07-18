import * as Yup from 'yup'
import { getPackSchema } from './pack-schema'
import { getSnippetSchema } from './snippet-schema'
import type { SnippetInput } from '@graphql-types'
import type { PackFormInputs } from './pack-schema'

export type PackEditFormInputs = PackFormInputs & { newSnippet: SnippetInput }

export const getPackEditSchema = () =>
  getPackSchema()
    .required()
    .concat(
      Yup.object()
        .shape({
          newSnippet: getSnippetSchema(),
        })
        .required(),
    )
