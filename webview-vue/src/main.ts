import Antd from "ant-design-vue";
import { createApp } from "vue";

import { initMessageListener } from "@/utils/vscodeUtils";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(Antd);
app.mount("#app");

initMessageListener(); // 执行监听

// 初始化完毕，通知 vscode 已经加载完了
if (window.vscode) {
  vscode.postMessage({ cmd: "webviewLoaded" });
}
