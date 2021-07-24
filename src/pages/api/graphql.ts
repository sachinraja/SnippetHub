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

const cors = Cors()

const getHandler = async () => {
  await server.start()
  return server.createHandler({
    path: '/api/graphql',
  })
}

const apolloHandlerPromise = getHandler()

const apiHandler: NextApiHandler = async (req, res) => {
  if (req.method === 'OPTIONS') return res.end()

  const apolloHandler = await apolloHandlerPromise
  await apolloHandler(req, res)

  return res.end()
}

// @ts-expect-error these are compatible
export default cors(apiHandler)
