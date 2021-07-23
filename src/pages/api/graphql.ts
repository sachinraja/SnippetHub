import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { context } from '@graphql/context'
import schemaWithMiddleware from '@graphql/schema'
import type { NextApiHandler, PageConfig } from 'next'

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context,
})

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}

const startServer = server.start()

const cors = Cors()

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'OPTIONS') return res.end()

  await startServer
  await server.createHandler({
    path: '/api/graphql',
  })(req, res)

  return res.end()
}

// @ts-expect-error these are compatible
export default cors(handler)
