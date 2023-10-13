//@ts-check

'use strict';

const path = require('path');

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
  target: 'node', // 'node'，因为我们的插件运行在 Node.js 环境中。
	mode: 'none',

  entry: './src/extension.ts', // webpack 使用的入口文件
  output: {
    // 告诉 webpack 应该把打包好的文件放在哪里，一般而言我们会放在dist文件夹里
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vscode: 'commonjs vscode' // 排除配置，在这里可以配置打包文件不应包含的文件和模块
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  // 配置 Typescript 和 Javascript 的解析器
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  devtool: 'nosources-source-map',
  infrastructureLogging: {
    level: "log", // enables logging required for problem matchers
  },
};
module.exports = [ extensionConfig ];