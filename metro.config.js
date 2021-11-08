const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, "properties"],
  },
  //   transformer: {
  //     babelTransformerPath: require.resolve("./babel-transformer.js"),
  //   },
};
