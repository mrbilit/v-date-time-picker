// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  outputDir: "lib",
  configureWebpack: {
    externals:
      process.env.NODE_ENV === "production"
        ? {
            moment: "moment-jalaali",
          }
        : {},
    resolve: {
      alias: {
        "@": path.resolve("src"),
      },
    },
  },
};
