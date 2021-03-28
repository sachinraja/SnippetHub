import convict from 'convict'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['development', 'test', 'production'],
    default: 'development',
    env: 'NODE_ENV',
  },
  db: {
    name: {
      doc: 'The database name.',
      format: String,
      default: 'snippethub',
      env: 'POSTGRES_DB',
    },
    host: {
      doc: 'The host to make the connection to.',
      format: String,
      default: 'localhost',
      env: 'HOST',
    },
    port: {
      doc: 'The database port.',
      format: 'port',
      default: 5432,
      env: 'DB_PORT',
    },
    user: {
      doc: 'The name of the user.',
      format: String,
      default: 'postgres',
      env: 'POSTGRES_USER',
    },
    password: {
      doc: 'The password for the user.',
      format: '*',
      default: null,
      env: 'POSTGRES_PASSWORD',
    },
    url: {
      doc: 'The url.',
      format: String,
      default: '',
      env: 'DATABASE_URL',
    },
  },
  github: {
    clientId: {
      doc: 'The OAuth client id.',
      format: String,
      default: '',
      env: 'GITHUB_CLIENT_ID',
    },
    clientSecret: {
      doc: 'The OAuth client secret.',
      format: String,
      default: '',
      env: 'GITHUB_CLIENT_SECRET',
    },
    personalGitHubId: {
      doc: 'Your GitHub id.',
      format: Number,
      default: 0,
      env: 'GITHUB_PERSONAL_ID',
    },
  },
  jwt: {
    accessTokenSecret: {
      doc: 'The secret used to sign the access token.',
      format: String,
      default: '',
      env: 'ACCESS_TOKEN_SECRET',
    },
    refreshTokenSecret: {
      doc: 'The secret used to sign the refresh token.',
      format: String,
      default: '',
      env: 'REFRESH_TOKEN_SECRET',
    },
  },
})

config.validate({ allowed: 'strict' })

export default config
