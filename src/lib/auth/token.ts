import { User } from '@prisma/client'
import { sign } from 'jsonwebtoken'
import envConfig from 'src/config'

export default function createTokens(user: User) {
  const refreshToken = sign(user, envConfig.get('jwt.refreshTokenSecret'), {
    expiresIn: '14d',
  })

  const accessToken = sign(user, envConfig.get('jwt.accessTokenSecret'), {
    expiresIn: '15min',
  })

  return { accessToken, refreshToken }
}
