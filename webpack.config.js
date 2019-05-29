const { webpackConfig, webpackMerge } = require('just-scripts');
module.exports = webpackMerge(webpackConfig, {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  });



