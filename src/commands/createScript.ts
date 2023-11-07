import * as vscode from "vscode";
import * as path from "path";
import { commands, ExtensionContext } from "vscode";
import * as fs from "fs-extra";

export const registerCreateScript = (context: ExtensionContext) => {
  context.subscriptions.push(
    commands.registerCommand("CodeToolBox.createScript", async (args) => {
      const rootPath = vscode.workspace.rootPath || ""; // 获取当前右键文件夹位置作为目标源
      // 规定复制源位置
      const sourceFolderPath = path.join(rootPath, "materials", "blocks");
      const targetFolderPath = args._fsPath;

      if (!sourceFolderPath) {
        vscode.window.showErrorMessage("请选择来源文件夹");
        return;
      }

      if (!targetFolderPath) {
        vscode.window.showErrorMessage("请选择目标文件夹");
        return;
      }

      try {
        await copyDirectoryContents(sourceFolderPath, targetFolderPath);
        vscode.window.showInformationMessage("复制文件夹内容成功");
      } catch (error) {
        vscode.window.showErrorMessage(`复制文件夹内容失败`);
      }
    }),
  );
};

async function copyDirectoryContents(sourcePath: string, targetPath: string) {
  // 确保目标目录存在，如果不存在则创建
  await fs.ensureDir(targetPath);

  // 获取源目录的内容列表
  const sourceItems = await fs.readdir(sourcePath);

  // 遍历源目录的内容
  for (const sourceItem of sourceItems) {
    const sourceItemPath = path.join(sourcePath, sourceItem);
    const targetItemPath = path.join(targetPath, sourceItem);

    // 判断是文件还是文件夹
    const isDirectory = (await fs.stat(sourceItemPath)).isDirectory();

    if (isDirectory) {
      // 如果是文件夹，递归复制子文件夹
      await copyDirectoryContents(sourceItemPath, targetItemPath);
    } else {
      // 如果是文件，直接复制
      await fs.copyFile(sourceItemPath, targetItemPath);
    }
  }
}
