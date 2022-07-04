const { defineConfig } = require("@vue/cli-service")
const path = require("path")

const resolve = (dir) => path.join(__dirname, dir)
const PORT = 3000

module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV !== "production",
  devServer: {
    port: process.env.PORT || PORT,
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"))
    config.plugin("html").tap((args) => {
      args[0].title = "Penguin ML"
      return args
    })
    config.optimization.runtimeChunk("single")
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        defaultVendors: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial",
        },
        common: {
          name: "chunk-common",
          test: resolve("src/components"),
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    })
  },
})
