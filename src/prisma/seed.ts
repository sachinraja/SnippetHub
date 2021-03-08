import {
  enum_Snippet_language,
  enum_User_type,
  PrismaClient,
} from '@prisma/client';
// must be relative import for ts-node resolution
import config from '../config';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { gitHubId: config.get('github').personalGitHubId },
    update: {},
    create: {
      gitHubId: config.get('github').personalGitHubId,
      username: 'xCloudzx',
      type: enum_User_type.admin,
      snippets: {
        create: [
          {
            id: 1,
            title: 'React',
            upvotes: 456123,
            description:
              'A collection of snippets for the React JavaScript Framework.',
            language: enum_Snippet_language.javascript,
            code: "import React from 'react'",
          },
          {
            id: 2,
            title: 'Vue.js',
            upvotes: 3123412,
            description:
              'Streamline your Vue.js code with these snippets to boost productivity.',
            language: enum_Snippet_language.javascript,
            code: "import Vue from 'vue'",
          },
          {
            id: 3,
            title: 'Elixir',
            upvotes: 5312,
            description:
              'The emerging leader in concurrency brings you these amazing snippets.',
            language: enum_Snippet_language.elixir,
            code: 'defmodule x do:\n',
          },
          {
            id: 4,
            title: 'Phoenix',
            upvotes: 2000,
            description:
              'Build rich, interactive web applications quickly, with less code and fewer moving parts. Join our growing community of developers using Phoenix to craft APIs, HTML5 apps and more, for fun or at scale.',
            language: enum_Snippet_language.elixir,
            code: 'use Phoenix.Socket',
          },
          {
            id: 5,
            title: 'Python Pack',
            upvotes: 62461224,
            description:
              'Code 5x faster than before with these blocks that greatly enhance your python experience.',
            language: enum_Snippet_language.python,
            code: 'from PIL import Image',
          },
          {
            id: 6,
            title: 'Node.js',
            upvotes: 9132,
            description: 'Essential snippets for the Node.js runtime.',
            language: enum_Snippet_language.javascript,
            code: "import lodash from 'lodash'",
          },
          {
            id: 7,
            title: 'Unity Blocks',
            upvotes: 4211223,
            description:
              'Supercharge your Unity experience with a multitude of easy-to-insert statements.',
            language: enum_Snippet_language.csharp,
            code: 'using UnityEngine;',
          },
          {
            id: 8,
            title: 'Flask',
            upvotes: 551231,
            description:
              'Flask is a lightweight package for python web development.',
            language: enum_Snippet_language.python,
            code: 'from flask import Flask',
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    /* eslint-disable no-console */
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect().catch((e) => {
      console.error(e);
      process.exit(1);
    });
  });
