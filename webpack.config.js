const { webpackConfig, webpackMerge } = require("just-scripts");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: ['typescript']
    }),
    new BundleAnalyzerPlugin(),
  ],
};

module.exports = webpackMerge(webpackConfig, config);
