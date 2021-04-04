import * as types from './objects'
import { makeSchema } from 'nexus'
import path from 'path'

const dirPath = path.join(process.cwd(), 'src', 'graphql')

const schema = makeSchema({
  contextType: {
    module: path.join(dirPath, 'context.ts'),
    export: 'Context',
  },
  outputs: {
    schema: path.join(dirPath, 'generated', 'schema.graphql'),
    typegen: path.join(dirPath, 'generated', 'nexus.d.ts'),
  },
  types,
})

export default schema
