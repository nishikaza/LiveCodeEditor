const { webpackMerge, htmlOverlay, webpackServeConfig } = require('just-scripts');
module.exports = webpackMerge(webpackServeConfig, htmlOverlay, {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  });
