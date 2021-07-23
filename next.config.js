const createNextPluginPreval = require('next-plugin-preval/config')

const withNextPluginPreval = createNextPluginPreval()

module.exports = withNextPluginPreval({
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  future: {
    strictPostcssConfiguration: true,
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
    })

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: ['graphql-let/schema/loader'],
    })

    return config
  },
})
