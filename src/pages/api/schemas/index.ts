import { makeSchema } from 'nexus';
import path from 'path';
import * as QueryTypes from './Query';

const schema = makeSchema({
  types: [QueryTypes],
  outputs: {
    schema: path.join(process.cwd(), __dirname, 'generated', 'schema.graphql'),
    typegen: path.join(process.cwd(), __dirname, 'generated', 'nexus.d.ts'),
  },
  contextType: {
    module: path.join(process.cwd(), __dirname, 'Context.ts'),
    export: 'Context',
  },
});

export default schema;
