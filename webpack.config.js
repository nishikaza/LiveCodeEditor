const { webpackConfig, webpackMerge } = require("just-scripts");
const path = require('path');
const APP_DIR = path.resolve(__dirname, './src');
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');

const config = {
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   include: APP_DIR,
      //   use: ["style-loader", "css-loader"]
      // }
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
    ]
  },
  node: {
    fs: "empty",
    module: "empty",
    net: "empty"
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
    })
  ]
};

module.exports = webpackMerge(webpackConfig, config);
