/* eslint-disable no-console */
import {
  PrismaClient,
  enum_Pack_language,
  enum_User_type,
} from '@prisma/client'
import axios from 'axios'
// must be relative import for ts-node resolution
import config from '../config'

const prisma = new PrismaClient()

async function main() {
  const { personalGitHubId } = config.get('github')

  // fetch username from github
  const githubUsername: string = (
    await axios.get(`https://api.github.com/user/${personalGitHubId}`)
  ).data.login

  await prisma.user.upsert({
    create: {
      bio:
        'A student and aspiring software engineer with a love for TypeScript and Python.',
      gitHubId: personalGitHubId,
      packs: {
        create: [
          {
            description:
              'A collection of snippets for the React JavaScript Framework.',
            language: enum_Pack_language.javascript,
            name: 'React',
            snippets: {
              create: [
                {
                  code: "import React from 'react'",
                  name: 'Import React',
                },
              ],
            },
            upvotes: 456123,
          },
          {
            description:
              'Streamline your Vue.js code with these snippets to boost productivity.',
            language: enum_Pack_language.javascript,
            name: 'Vue.js',
            snippets: {
              create: [
                {
                  code: "import Vue from 'vue'",
                  name: 'Import Vue',
                },
              ],
            },
            upvotes: 3123412,
          },
          {
            description:
              'The emerging leader in concurrency brings you these amazing snippets.',
            language: enum_Pack_language.elixir,
            name: 'Elixir',
            snippets: {
              create: [
                {
                  code: 'defmodule x do:\n',
                  name: 'Elixir defmodule',
                },
              ],
            },
            upvotes: 5312,
          },
          {
            description:
              'Build rich, interactive web applications quickly, with less code and fewer moving parts. Join our growing community of developers using Phoenix to craft APIs, HTML5 apps and more, for fun or at scale.',
            language: enum_Pack_language.elixir,
            name: 'Phoenix',
            snippets: {
              create: [
                {
                  code: 'use Phoenix.Socket',
                  name: 'Use Phoenix.Socket',
                },
              ],
            },
            upvotes: 2000,
          },
          {
            description:
              'Code 5x faster than before with these blocks that greatly enhance your python experience.',
            language: enum_Pack_language.python,
            name: 'python-pack',
            snippets: {
              create: [
                {
                  code: 'from PIL import Image',
                  name: 'Import PIL',
                },
              ],
            },
            upvotes: 62461224,
          },
          {
            description: 'Essential snippets for the Node.js runtime.',
            language: enum_Pack_language.javascript,
            name: 'Node.js',
            snippets: {
              create: [
                {
                  code: "import lodash from 'lodash'",
                  name: 'Lodash Import',
                },
              ],
            },
            upvotes: 9132,
          },
          {
            description:
              'Supercharge your Unity experience with a multitude of easy-to-insert statements.',
            language: enum_Pack_language.csharp,
            name: 'Unity-Blocks',
            snippets: {
              create: [
                {
                  code: 'using UnityEngine;',
                  name: 'Use Unity Engine',
                },
              ],
            },
            upvotes: 4211223,
          },
          {
            description:
              'Flask is a lightweight package for python web development.',
            language: enum_Pack_language.python,
            name: 'Flask',
            snippets: {
              create: {
                code: 'from flask import Flask',
                name: 'Flask Import',
              },
            },
            upvotes: 551231,
          },
        ],
      },
      type: enum_User_type.admin,
      username: githubUsername,
    },
    update: {},
    where: { gitHubId: personalGitHubId },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect().catch((e) => {
      console.error(e)
      process.exit(1)
    })
  })
