import prisma from '@lib/prisma';
import { ApolloServer } from 'apollo-server-micro';
import schema from './schemas';

const server = new ApolloServer({
  schema,
  context: () => ({ prisma }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
