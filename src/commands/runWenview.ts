import { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import { showWebView } from "../utils/webviewUtils";

export const registerRunWebView = (context: ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand("CodeToolBox.webview", () => {
      showWebView(context, {
        key: "main",
        title: "添加代码片段",
        viewColumn: 1,
        task: {
          task: "route",
          data: {
            path: "/add-snippets",
          },
        },
      });
    }),
  );
};
