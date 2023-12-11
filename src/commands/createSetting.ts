import { commands, ExtensionContext, ViewColumn } from "vscode";
import { showWebView } from "../utils/webviewUtils";

export const registerCreateSetting = (context: ExtensionContext) => {
  context.subscriptions.push(
    commands.registerCommand("CodeToolBox.openSetting", async () => {
      showWebView(context, {
        key: "main",
        title: "设置",
        viewColumn: ViewColumn.One,
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
