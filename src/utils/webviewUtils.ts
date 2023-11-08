import { ExtensionContext } from "vscode";
import * as vscode from "vscode";

const path = require("path");

// webview key，后期用于区分任务
type WebViewKeys = "main";
// webview 任务的类型
type Tasks = "addSnippets" | "route";

// 当前的webview列表
let webviewPanelList: {
  key: WebViewKeys; // key
  panel: vscode.WebviewPanel; // 视图
  disposables: vscode.Disposable[]; // 管理资源，比如销毁
}[] = [];

// 创建webview
export const showWebView = (
  context: ExtensionContext,
  options: {
    key: WebViewKeys; // webview key
    title?: string; // webview 标题
    viewColumn?: vscode.ViewColumn; // 视图数量
    task?: { task: Tasks; data?: any }; // webview 打开后执行命令，比如转到指定路由
  },
) => {
  // 先判断，webview是否存在了，存在了则不新增，传递消息给webview处理后续
  const webview = webviewPanelList.find((s) => s.key === options.key);
  console.log("webview", webview);

  if (webview) {
    webview.panel.reveal(); // 显示webview
    // 传递任务
    if (options.task) {
      webview.panel.webview.postMessage({
        cmd: "vscodePushTask",
        task: options.task.task,
        data: options.task.data,
      });
    }
  } else {
    const panel = vscode.window.createWebviewPanel(
      "CodeToolBox",
      options.title || "CodeToolBox",
      {
        viewColumn: options.viewColumn || vscode.ViewColumn.Two,
      },
      {
        enableScripts: true,
        retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
      },
    );
    // 设置icon
    panel.iconPath = vscode.Uri.file(
      path.join(context.extensionPath, "images", "title.jpg"),
    );
    panel.webview.html = getHtmlForWebview(context, panel);

    // 创建资源管理列表
    const disposables: vscode.Disposable[] = [];
    // 创建监听器，监听 webview 返回信息，
    // 在webview中会通过 vscode.postMessage{command: 'someCommand',data: { /* 你的数据 */ },} 发送信息
    panel.webview.onDidReceiveMessage(
      async (message: {
        cmd: string;
        cbid: string;
        data: any;
        skipError?: boolean;
      }) => {
        console.log("回调message", message);
      },
      null,
      disposables,
    );
    // 关闭时销毁
    panel.onDidDispose(
      () => {
        panel.dispose();
        while (disposables.length) {
          const x = disposables.pop();
          if (x) {
            x.dispose();
          }
        }
        // 去掉该 panel
        webviewPanelList = webviewPanelList.filter(
          (s) => s.key !== options.key,
        );
      },
      null,
      disposables,
    );
    // 添加
    webviewPanelList.push({
      key: options.key,
      panel,
      disposables,
    });
    // 处理任务
    if (options.task) {
      console.log("options.task", options.task);

      panel.webview.postMessage({
        cmd: "vscodePushTask",
        task: options.task.task,
        data: options.task.data,
      });
    }
  }
};

// 获取 webview html
export const getHtmlForWebview = (
  context: ExtensionContext,
  panel: vscode.WebviewPanel,
) => {
  const isProduction =
    context.extensionMode === vscode.ExtensionMode.Production;
  let srcUrl: string | vscode.Uri = "";
  if (isProduction) {
    const mainScriptPathOnDisk = vscode.Uri.file(
      path.join(context.extensionPath, "webview-dist", "main.js"),
    );
    srcUrl = panel.webview.asWebviewUri(mainScriptPathOnDisk);
  } else {
    srcUrl = "http://127.0.0.1:7979/src/main.ts";
  }
  return getWebviewContent(srcUrl);
};

// webview html 容器
const getWebviewContent = (srcUri: string | vscode.Uri) => {
  return `<!doctype html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>webview-react</title>
      
    </head>
    <body>
      <div id="app"></div>
      <script  type="module" src="${srcUri}"></script>
    </body>
    </html>`;
};