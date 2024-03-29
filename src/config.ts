import path from 'path'
import convict from 'convict'
import dotenv from 'dotenv'

function loadEnv() {
  if (process.env.NODE_ENV === 'production') return
  // load env from files if not in production
  const envFileExt =
    process.env.NODE_ENV === 'development' ? '.env.local' : '.env.test.local'
  dotenv.config({ path: '.env.local' })
  dotenv.config({ path: path.join('src', 'prisma', envFileExt) })
}

loadEnv()

const unvalidatedEnvConfig = convict({
  db: {
    url: {
      default: '',
      doc: 'The databaase url.',
      env: 'DATABASE_URL',
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
      doc: 'The GitHub OAuth client id.',
      env: 'GITHUB_CLIENT_ID',
      format: String,
    },
    clientSecret: {
      default: '',
      doc: 'The GitHub OAuth client secret.',
      env: 'GITHUB_CLIENT_SECRET',
      format: String,
    },
    personalGitHubId: {
      default: 0,
      doc: 'Your GitHub id.',
      env: 'GITHUB_PERSONAL_ID',
      format: Number,
    },
    personalUsername: {
      default: '',
      doc: 'Your GitHub username. Used to seed the database and query it during tests.',
      env: 'GITHUB_USERNAME',
      format: String,
    },
  },
  jwt: {
    secret: {
      default: '',
      doc: 'The secret used to sign tokens.',
      env: 'JWT_SECRET',
      format: String,
    },
    signingPrivateKey: {
      default: '',
      doc: 'The private signing key used by next-auth to sign tokens.',
      env: 'JWT_SIGNING_PRIVATE_KEY',
      format: String,
    },
  },
})

const envConfig = unvalidatedEnvConfig.validate({ allowed: 'strict' })

export default envConfig
