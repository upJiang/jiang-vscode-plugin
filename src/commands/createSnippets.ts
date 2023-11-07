import * as vscode from "vscode";
import { commands, ExtensionContext } from "vscode";

export const registerCreateSnippets = (context: ExtensionContext) => {
  context.subscriptions.push(
    commands.registerCommand("CodeToolBox.createSnippets", async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const snippetName = "JavaScript Console Log"; // 替换为您的代码片段名称
        if (editor.selection.isEmpty) {
          const snippet = new vscode.SnippetString(snippetName);
          editor.insertSnippet(snippet);
        }
      }
    }),
  );
};
