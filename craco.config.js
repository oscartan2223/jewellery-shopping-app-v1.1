// craco.config.js

const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (config) => {
      config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
        })
      ];
      return config;
    }
  }
};
