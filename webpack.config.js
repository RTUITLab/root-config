const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "rtuitlab",
    projectName: "root-config",
    webpackConfigEnv,
  });

  defaultConfig.output.path = path.resolve(
    __dirname,
    "./deploy/ITLab-Root-Front"
  );

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
        },
      }),
      new CopyPlugin({
        patterns: [{ from: "src/config.json", to: "." }],
      }),
    ],
  });
};
