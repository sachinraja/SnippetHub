module.exports = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  future: {
    strictPostcssConfiguration: true,
    webpack5: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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
}
