import { User } from '@prisma/client'
import { sign } from 'jsonwebtoken'
import config from 'src/config'

export default function createTokens(user: User) {
  const refreshToken = sign(user, config.get('jwt').refreshTokenSecret, {
    expiresIn: '14d',
  })

  const accessToken = sign(user, config.get('jwt').accessTokenSecret, {
    expiresIn: '15min',
  })

  return { refreshToken, accessToken }
}
