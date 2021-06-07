/* eslint-disable camelcase */
import { User } from '@prisma/client'
import axios from 'axios'
import createTokens from '@lib/auth/token'
import envConfig from 'src/config'
import prisma from '@lib/prisma'
import type { AxiosRequestConfig } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.code) {
    res.status(401).send('Required parameter code is missing.')
    return
  }

  const githubConfig = envConfig.get('gitHub')

  const tokenReqBody = {
    client_id: githubConfig.clientId,
    client_secret: githubConfig.clientSecret,
    code: req.query.code,
  }

  const opts: AxiosRequestConfig = { headers: { Accept: 'application/json' } }

  const tokenRes: { data: { access_token?: string } } = await axios.post(
    'https://github.com/login/oauth/access_token',
    tokenReqBody,
    opts,
  )
  const githubAccessToken = tokenRes.data.access_token
  if (!githubAccessToken) {
    res
      .status(401)
      .send('Failed to authenticate with GitHub: bad access token.')
    return
  }

  const userReqBody = {
    query: `
      query {
        viewer {
          databaseId
          login
        }
      }
    `,
  }

  opts.headers.Authorization = `bearer ${githubAccessToken}`

  const userRes = await axios.post(
    'https://api.github.com/graphql',
    userReqBody,
    opts,
  )

  const userData = userRes.data.data.viewer

  // find user or insert
  const user: User = await prisma.user.upsert({
    create: {
      gitHubId: userData.databaseId,
      username: userData.login,
    },
    update: {},
    where: {
      gitHubId: userData.databaseId,
    },
  })

  const tokens = createTokens(user)
  // res.status(200).json(tokens)
  setCookie({ res }, 'user', tokens.accessToken, {
    path: '/',
  })
  res.redirect('/')
}

export default handler
