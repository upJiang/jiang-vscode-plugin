import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
// https://juejin.cn/post/7277804250024902693 打包配置参考
export default defineConfig({
  base: "./",
  plugins: [vue(), cssInjectedByJsPlugin()],
  // 配置别名
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "#": fileURLToPath(new URL("./types", import.meta.url)),
    },
  },
  server: {
    port: 7979,
  },
  // 打包配置
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/main.ts"), // 设置入口文件【这里也可以直接引用插件.vue根组件】
      name: "main", // 起个名字，安装、引入用
      formats: ["es"],
      fileName: `main`, // 打包后的文件名【可以自定义】
    },
    sourcemap: false, // 输出.map文件
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      // external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          helloword: "helloword", // 这里暴露出去一个全局变量
        },
      },
    },
    outDir: "../webview-dist",
  },
});
// && yarn --cwd \"webview-vue\" build
