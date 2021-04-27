const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const config = require("./src/config.json");

const map = {};
Object.keys(config).forEach(
  (frontend) => (map["itlab-" + frontend] = config[frontend])
);

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
        favicon: "src/favicon.ico",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
          importmap: JSON.stringify(map),
        },
      }),
      new CopyPlugin({
        patterns: [{ from: "src/config.json", to: "." }],
      }),
    ],
  });
};
