const { webpackConfig, webpackMerge } = require("just-scripts");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

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
      react: "React"
    },
    {
      "react-dom": "ReactDOM"
    }
  ],
  plugins: [new BundleAnalyzerPlugin()]
};

module.exports = webpackMerge(webpackConfig, config);
