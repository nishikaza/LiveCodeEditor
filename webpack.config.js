const { webpackConfig, webpackMerge } = require('just-scripts');

const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  node: {
    fs: 'empty',
    module: 'empty',
    net: 'empty'
  },
}

module.exports = webpackMerge(webpackConfig,config);



