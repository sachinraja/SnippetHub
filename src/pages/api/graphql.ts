import { ApolloServer } from 'apollo-server-micro'
import { context } from '@graphql/context'
import schemaWithMiddleware from '@graphql/schema'
import type { PageConfig } from 'next'

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context,
})

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}

function createHandler() {
  return server.createHandler({ path: '/api/graphql' })
}

export default createHandler()
