// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("node:path");

module.exports = {
  outputDir: "lib",
  transpileDependencies: ["dayjs", "jalaliday"],
  configureWebpack: {
    externals:
      process.env.NODE_ENV === "production"
        ? {
            dayjs: "dayjs",
            jalaliday: "jalaliday",
          }
        : {},
    resolve: {
      alias: {
        "@": path.resolve("src"),
      },
    },
  },
};
