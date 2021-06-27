import { rule, shield } from 'graphql-shield'
import envConfig from 'src/config'
import type { IOptionsConstructor } from 'graphql-shield/dist/types'
import type { Context } from './context'

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context) => Boolean(ctx.session),
)

const options: IOptionsConstructor =
  envConfig.get('env') === 'development'
    ? {
        debug: true,
      }
    : {}

const permissions = shield(
  {
    Query: {
      userByUsername: isAuthenticated,
    },
    Mutation: {
      createPack: isAuthenticated,
    },
  },
  options,
)

export default permissions
