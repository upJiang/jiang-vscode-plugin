import { commands, ExtensionContext, window, workspace } from "vscode";

export const registerCreateExplainByChatGPT = (context: ExtensionContext) => {
  context.subscriptions.push(
    commands.registerCommand("CodeToolBox.explainByChatGPT", () => {
      // 获取当前活动的文本编辑器
      const editor = window.activeTextEditor;

      if (editor) {
        // 获取用户选中的文本
        const selectedText = editor.document.getText(editor.selection);
        if (!selectedText) {
          window.showInformationMessage("没有选中的文本");
          return;
        }
        // 打印选中的文本（你可以根据需求进行其他操作）
        console.log("Selected text:", selectedText);
        // 获取本插件的设置
        const config = workspace.getConfiguration("CodeToolBox");
        const hostname = config.get("hostname");
        const apiKey = config.get("apiKey");
        console.log("设置的hostname:", hostname);
        console.log("设置的apiKey:", apiKey);
        if (!hostname) {
          window.showInformationMessage(
            "请先设置插件 CodeToolBox 的 hostname，点击左侧标签栏 CodeToolBox 的图标进行设置",
          );
          return;
        }
        if (!apiKey) {
          window.showInformationMessage(
            "请先设置插件 CodeToolBox 的 apiKey，点击左侧标签栏 CodeToolBox 的图标进行设置",
          );
          return;
        }
        // 打开左侧的 chatGPT 对话框
      } else {
        window.showInformationMessage("没有活动的文本编辑器");
      }
    }),
  );
};
