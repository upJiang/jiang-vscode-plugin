import { commands, ExtensionContext } from "vscode";

export const registerCreateSetting = (context: ExtensionContext) => {
  context.subscriptions.push(
    commands.registerCommand("CodeToolBox.openSetting", () => {
      // 打开插件设置
      commands.executeCommand("workbench.action.openSettings", "CodeToolBox");
    }),
  );
};
