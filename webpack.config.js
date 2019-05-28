const { webpackConfig } = require('just-scripts');
const merge = require('webpack-merge');
const webpack = require('webpack');
const prismStuff = {
  plugins:[
    new webpack.ProvidePlugin({
      highlight: 'prismjs/components/prism-core',
      languages: 'prismjs/components/prism-core'
    })
  ]
}

module.exports =merge(prismStuff, webpackConfig);



