import { ApolloServer } from 'apollo-server-micro'
import { context } from 'src/graphql/context'
import schema from 'src/graphql/schema'

const server = new ApolloServer({
  schema,
  context,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default server.createHandler({ path: '/api/graphql' })
