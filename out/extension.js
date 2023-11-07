"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "CodeToolBox.webview",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from my-vscode-extendsion!",
      );
      const panel = vscode.window.createWebviewPanel(
        "webview",
        "webview app",
        vscode.ViewColumn.One,
        {
          retainContextWhenHidden: true,
          enableScripts: true, // 运行 JS 执行
        },
      );
      // const isProduction =
      //   context.extensionMode === vscode.ExtensionMode.Production;
      // let srcUrl = "";
      // if (!isProduction) {
      //   const filePath = vscode.Uri.file(
      //     path.join(context.extensionPath, "webview", "dist/index.html"),
      //   );
      //   srcUrl = panel.webview.asWebviewUri(filePath).toString();
      // } else {
      //   console.log("111111");
      // }
      let srcUrl = "http://127.0.0.1:8081/src/main.ts";
      console.log("srcUrl", srcUrl);
      // srcUrl = panel.webview.asWebviewUri(srcUrl)
      panel.webview.html = getWebviewContent(srcUrl);
      const updateWebview = () => {
        panel.webview.html = getWebviewContent(srcUrl);
      };
      updateWebview();
      const interval = setInterval(updateWebview, 1000);
      panel.onDidDispose(
        () => {
          clearInterval(interval);
        },
        null,
        context.subscriptions,
      );
    },
  );
  context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() {}
exports.deactivate = deactivate;
function getWebviewContent(srcUri) {
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
}
//# sourceMappingURL=extension.js.map
