import { ExtensionContext } from "vscode";
import * as vscode from "vscode";

const path = require("path");

export const registerRunWebView = (context: ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand("CodeToolBox.webview", () => {
      const panel = vscode.window.createWebviewPanel(
        "webview",
        "webview app",
        vscode.ViewColumn.One,
        {
          retainContextWhenHidden: true, // 保证 Webview 所在页面进入后台时不被释放
          enableScripts: true, // 运行 JS 执行
        },
      );

      const isProduction =
        context.extensionMode === vscode.ExtensionMode.Production;
      let srcUrl = "";
      if (isProduction) {
        const filePath = vscode.Uri.file(
          path.join(context.extensionPath, "webview", "dist/index.html"),
        );
        srcUrl = panel.webview.asWebviewUri(filePath).toString();
      } else {
        srcUrl = "http://127.0.0.1:7979/src/main.ts";
      }
      panel.webview.html = getWebviewContent(srcUrl);
    }),
  );
};

function getWebviewContent(srcUri: string) {
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
