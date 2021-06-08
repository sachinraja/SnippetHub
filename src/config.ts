import path from 'path'
import convict from 'convict'
import dotenv from 'dotenv'

function loadEnv() {
  // load env from files if not in production
  if (process.env.NODE_ENV === 'production') return
  const envFileExt =
    process.env.NODE_ENV === 'development' ? '.env.local' : '.env.test.local'
  dotenv.config({ path: '.env.local' })
  dotenv.config({ path: path.join('src', 'prisma', envFileExt) })
}

loadEnv()

const unvalidatedEnvConfig = convict({
  db: {
    host: {
      default: 'localhost',
      doc: 'The host to make the connection to.',
      env: 'DB_HOST',
      format: String,
    },
    name: {
      default: 'snippethub',
      doc: 'The database name.',
      env: 'POSTGRES_DB',
      format: String,
    },
    password: {
      default: null,
      doc: 'The password for the user.',
      env: 'POSTGRES_PASSWORD',
      format: String,
      nullable: true,
    },
    port: {
      default: 5432,
      doc: 'The database port.',
      env: 'DB_PORT',
      format: 'port',
    },
    url: {
      default: '',
      doc: 'The databaase url.',
      env: 'DATABASE_URL',
      format: String,
    },
    user: {
      default: 'postgres',
      doc: 'The name of the user.',
      env: 'POSTGRES_USER',
      format: String,
    },
  },
  env: {
    default: 'development',
    doc: 'The application environment.',
    env: 'NODE_ENV',
    format: ['development', 'test', 'production'],
  },
  gitHub: {
    clientId: {
      default: '',
      doc: 'The OAuth client id.',
      env: 'GITHUB_CLIENT_ID',
      format: String,
    },
    clientSecret: {
      default: '',
      doc: 'The OAuth client secret.',
      env: 'GITHUB_CLIENT_SECRET',
      format: String,
    },
    personalGitHubId: {
      default: 0,
      doc: 'Your GitHub id.',
      env: 'GITHUB_PERSONAL_ID',
      format: Number,
    },
  },
  jwt: {
    accessTokenSecret: {
      default: '',
      doc: 'The secret used to sign the access token.',
      env: 'ACCESS_TOKEN_SECRET',
      format: String,
    },
    refreshTokenSecret: {
      default: '',
      doc: 'The secret used to sign the refresh token.',
      env: 'REFRESH_TOKEN_SECRET',
      format: String,
    },
  },
  serverUrl: {
    default: 'http://localhost:3000',
    doc: 'The server url.',
    env: 'NEXT_PUBLIC_SERVER_URL',
    format: String,
  },
})

const envConfig = unvalidatedEnvConfig.validate({ allowed: 'strict' })

export default envConfig
