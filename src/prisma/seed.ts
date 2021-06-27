/* eslint-disable no-console */
import { Language, PrismaClient, UserType } from '@prisma/client'
import axios from 'axios'
// must be relative import for ts-node resolution
import envConfig from '../config'

const prisma = new PrismaClient()

export async function seed() {
  const personalGitHubId = envConfig.get('gitHub.personalGitHubId')

  // fetch username from github
  const githubUsername: string = (
    await axios.get(`https://api.github.com/user/${personalGitHubId}`)
  ).data.login

  await prisma.user.upsert({
    where: { username: githubUsername },
    create: {
      type: UserType.admin,
      username: githubUsername,
      image: `https://avatars.githubusercontent.com/u/${personalGitHubId}`,
      bio: 'A student and aspiring software engineer with a love for TypeScript and Python.',
      accounts: {
        create: {
          providerType: 'oauth',
          providerId: 'github',
          providerAccountId: personalGitHubId.toString(),
        },
      },
      packs: {
        create: [
          {
            shortDescription:
              'A collection of snippets for the React JavaScript Framework.',
            language: Language.javascript,
            name: 'React',
            snippets: {
              create: [
                {
                  name: 'Import React',
                  code: "import React from 'react'",
                  language: Language.javascript,
                },
              ],
            },
            upvotes: 456123,
          },
          {
            shortDescription:
              'Streamline your Vue.js code with these snippets to boost productivity.',
            language: Language.javascript,
            name: 'Vue.js',
            snippets: {
              create: [
                {
                  name: 'Import Vue',
                  code: "import Vue from 'vue'",
                  language: Language.javascript,
                },
              ],
            },
            upvotes: 3123412,
          },
          {
            shortDescription:
              'The emerging leader in concurrency brings you these amazing snippets.',
            language: Language.elixir,
            name: 'Elixir',
            snippets: {
              create: [
                {
                  name: 'Elixir defmodule',
                  code: 'defmodule x do:\n',
                  language: Language.elixir,
                },
              ],
            },
            upvotes: 5312,
          },
          {
            shortDescription:
              'Build rich, interactive web applications quickly, with less code and fewer moving parts. Join our growing community of developers using Phoenix to craft APIs, HTML5 apps and more, for fun or at scale.',
            language: Language.elixir,
            name: 'Phoenix',
            snippets: {
              create: [
                {
                  name: 'Use Phoenix.Socket',
                  code: 'use Phoenix.Socket',
                  language: Language.elixir,
                },
              ],
            },
            upvotes: 2000,
          },
          {
            shortDescription:
              'Code 5x faster than before with these blocks that greatly enhance your python experience.',
            language: Language.python,
            name: 'python-pack',
            snippets: {
              create: [
                {
                  name: 'Import PIL',
                  code: 'from PIL import Image',
                  language: Language.python,
                },
              ],
            },
            upvotes: 62461224,
          },
          {
            shortDescription: 'Essential snippets for the Node.js runtime.',
            language: Language.javascript,
            name: 'Node.js',
            snippets: {
              create: [
                {
                  name: 'Lodash Import',
                  code: "import lodash from 'lodash'",
                  language: Language.javascript,
                },
              ],
            },
            upvotes: 9132,
          },
          {
            shortDescription:
              'Supercharge your Unity experience with a multitude of easy-to-insert statements.',
            language: Language.csharp,
            name: 'Unity-Blocks',
            snippets: {
              create: [
                {
                  name: 'Use Unity Engine',
                  code: 'using UnityEngine;',
                  language: Language.csharp,
                },
              ],
            },
            upvotes: 4211223,
          },
          {
            shortDescription:
              'Flask is a lightweight package for python web development.',
            language: Language.python,
            name: 'Flask',
            snippets: {
              create: {
                name: 'Flask Import',
                code: 'from flask import Flask',
                language: Language.python,
              },
            },
            upvotes: 551231,
          },
        ],
      },
    },
    update: {},
  })

  prisma.$disconnect()
}
