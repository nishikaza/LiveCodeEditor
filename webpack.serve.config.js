const {
  webpackMerge,
  webpackServeConfig
} = require("just-scripts");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = webpackMerge(webpackServeConfig, {
  module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ],
    },
    plugins: [
      new MonacoWebpackPlugin({
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
    },
    {fs:    "commonjs fs"},
  ],
});
