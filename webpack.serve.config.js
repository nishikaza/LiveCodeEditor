const {
  webpackMerge,
  // htmlOverlay,
  webpackServeConfig
} = require("just-scripts");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = webpackMerge(webpackServeConfig, {
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
    plugins: [
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ['typescript'],
      }),
      new BundleAnalyzerPlugin(),
    ],
  externals: [
    {
      react: "React"
    },
    {
      "react-dom": "ReactDOM"
    }
  ],
});
