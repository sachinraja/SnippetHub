import { ApolloServer } from 'apollo-server-micro'
import { context } from '@graphql/context'
import schemaWithMiddleware from '@graphql/schema'

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

/* eslint-disable @typescript-eslint/no-namespace */
type HandlerType = ReturnType<ApolloServer['createHandler']>

declare global {
  namespace NodeJS {
    interface Global {
      apolloHandler: HandlerType
    }
  }
}

function createHandler() {
  return server.createHandler({ path: '/api/graphql' })
}

/* eslint-disable-next-line import/no-mutable-exports */
/* let handler: HandlerType
if (envConfig.get('env') === 'production') {
  handler = createHandler()
} else {
  if (!global.apolloHandler) {
    global.apolloHandler = createHandler()
  }
  handler = global.apolloHandler
} */

export default createHandler()
