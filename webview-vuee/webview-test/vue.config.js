// vue.config.js
const path = require("path");
module.exports = {
  outputDir: "../../webview-dist",
  css: {
    extract: false, // 使css文件打包到js中
  },
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
    config.resolve.alias
      .set("@", path.resolve(__dirname, "src"))
      // Add other resolve configurations if needed
      .end();
  },
  configureWebpack: {
    entry: {
      app: "./src/main.js", // 请确保路径正确，根据你的项目结构可能需要调整
    },
    output: {
      filename: "main.js",
    },
    // module: {
    //   rules: [
    //     {
    //       test: /\.css$/,
    //       use: ["style-loader", "css-loader"],
    //     },
    //   ],
    // },
  },
  filenameHashing: false, // 文件名不添加hash
  devServer: {
    port: 9999, // 设置端口号为 8080
    open: true,
  },
};
