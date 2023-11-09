import { commands, ExtensionContext } from "vscode";
import { showWebView } from "../utils/webviewUtils";

export const registerCreateSnippets = (context: ExtensionContext) => {
  context.subscriptions.push(
    commands.registerCommand("CodeToolBox.createSnippets", async () => {
      showWebView(context, {
        key: "main",
        title: "添加代码片段",
        viewColumn: 1,
        task: {
          task: "addSnippets",
        },
      });
    }),
  );
};
