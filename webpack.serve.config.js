const {
  webpackMerge,
  htmlOverlay,
  webpackServeConfig
} = require("just-scripts");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
<<<<<<< HEAD
=======
const APP_DIR = path.resolve(__dirname, './src');
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
>>>>>>> 629e02da67ead4c11d3c4caa0a7bddd451007ada

module.exports = webpackMerge(webpackServeConfig, htmlOverlay, {
  mode: "production",
  module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ],
    },
      node: {
      fs: 'empty',
      module: 'empty',
      net: 'empty'
    },
    externals: [
      {
        react: 'React'
      },
      {
        'react-dom': 'ReactDOM'
      }
    ],
    plugins: [
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ['typescript']
      }),
      new BundleAnalyzerPlugin()
    ]
});
