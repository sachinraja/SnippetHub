import { User } from '@prisma/client';
import config from 'src/config';
import { sign } from 'jsonwebtoken';

export default function createTokens(user: User) {
  const refreshToken = sign(user, config.get('jwt').refreshTokenSecret, {
    expiresIn: '14d',
  });

  const accessToken = sign(user, config.get('jwt').accessTokenSecret, {
    expiresIn: '15min',
  });

  return { refreshToken, accessToken };
}
