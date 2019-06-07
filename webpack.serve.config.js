const {
  webpackMerge,
  htmlOverlay,
  webpackServeConfig
} = require("just-scripts");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
const APP_DIR = path.resolve(__dirname, './src');
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = webpackMerge(webpackServeConfig, htmlOverlay, {
    module: {
      rules: [
        {
          test: /\.css$/,
          include: APP_DIR,
          use: [{
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
          }],
        }, {
          test: /\.css$/,
          include: MONACO_DIR,
          use: ['style-loader', 'css-loader'],
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
