const { webpackConfig, webpackMerge } = require("just-scripts");
const path = require('path');
const APP_DIR = path.resolve(__dirname, './src');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
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
    }),
<<<<<<< HEAD
=======
    new BundleAnalyzerPlugin()
>>>>>>> 629e02da67ead4c11d3c4caa0a7bddd451007ada
  ]
};

module.exports = webpackMerge(webpackConfig, config);
