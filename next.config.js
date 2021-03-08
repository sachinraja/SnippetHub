module.exports = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  webpack: (config, options) => {
    config.watchOptions = config.watchOptions || {};
    config.watchOptions.aggregateTimeout = 500;
    config.watchOptions.poll = 1000;
    
    return config
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};
