/* eslint-disable @typescript-eslint/no-explicit-any */

import router from "@/router";

const callbacks: { [propName: string]: (data: any) => void } = {};
const errorCallbacks: { [propName: string]: (data: any) => void } = {};

export function callVscode(
  data: { cmd: string; data?: any; skipError?: boolean },
  cb?: (data: any) => void,
  errorCb?: (data: any) => void,
) {
  if (cb) {
    const cbid = `${Date.now()}${Math.round(Math.random() * 100000)}`;
    callbacks[cbid] = cb;
    // vscode.postMessage({
    //   ...data,
    //   cbid,
    // });
    if (errorCb) {
      errorCallbacks[cbid] = errorCb;
    }
  } else {
    // vscode.postMessage(data);
  }
}

// 初始化
export const initMessageListener = () => {
  window.addEventListener("message", (event) => {
    const message = event.data;
    switch (message.cmd) {
      case "vscodePushTask":
        if (taskHandler[message.task]) {
          taskHandler[message.task](message.data);
        } else {
          message.error(`未找到名为 ${message.task} 回调方法!`);
        }
        break;
    }
  });
};

// 分发任务
export const taskHandler: {
  [propName: string]: (data: any) => void;
} = {
  // 跳转路由
  route: (data: { path: string }) => {
    router.push(data.path);
  },
};
