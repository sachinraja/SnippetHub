import { applyMiddleware } from 'graphql-middleware'
import { makeSchema } from 'nexus'
import path from 'path'
import * as types from './objects'
import permissions from './permissions'

const dirPath = path.join(process.cwd(), 'src', 'graphql')

const schema = makeSchema({
  contextType: {
    module: path.join(dirPath, 'context.ts'),
    export: 'Context',
  },
  outputs: {
    schema: path.join(dirPath, '__generated__', 'schema.graphqls'),
    typegen: path.join(dirPath, '__generated__', 'nexus.d.ts'),
  },
  types,
})

const schemaWithMiddleware = applyMiddleware(schema, permissions)

export default schemaWithMiddleware
