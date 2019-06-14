const {
  webpackMerge,
  // htmlOverlay,
  webpackServeConfig
} = require("just-scripts");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

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
        // features: ['coreCommands']
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
