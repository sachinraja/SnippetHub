import { GraphQLDateTime } from 'graphql-scalars'
import { decorateType } from 'nexus'

export * from './language'
export * from './snippet'
export * from './pack'
export * from './user'
export * from './query'

export const GQDateTime = decorateType(GraphQLDateTime, {
  asNexusMethod: 'dateTime',
})
