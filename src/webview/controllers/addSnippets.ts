import * as vscode from "vscode";
import * as path from "path";

export const addSnippets = (
  context: vscode.ExtensionContext,
  message: {
    data: {
      tips: string;
      prefix: string;
      body: string;
      description: string;
    };
  },
) => {
  // 获取当前项目下的路径
  const rootPath = vscode.workspace.rootPath;
  const extensionPath = path.join(rootPath!, ".vscode/test.code-snippets");
  const snippetFilePath = vscode.Uri.file(extensionPath);

  // 创建代码片段
  const newSnippet = {
    [message.data.tips]: {
      prefix: message.data?.prefix,
      body: [message.data?.body],
      description: message.data?.description,
    },
  };

  // 将代码片段写入文件并添加到扩展程序
  const writesnippetFilePath = async () => {
    try {
      let existingSnippets = {};

      // 保证一定有该文件
      try {
        const folderStat = await vscode.workspace.fs.stat(snippetFilePath);

        if (folderStat.type !== vscode.FileType.File) {
          await vscode.workspace.fs.writeFile(
            snippetFilePath,
            Buffer.from("", "utf8"),
          );
        }
      } catch (error) {
        await vscode.workspace.fs.writeFile(
          snippetFilePath,
          Buffer.from("", "utf8"),
        );
      }

      // 读取原有文件内容
      const snippetsFileContent =
        await vscode.workspace.fs.readFile(snippetFilePath);
      if (snippetsFileContent && snippetsFileContent.toString())
        existingSnippets = JSON.parse(snippetsFileContent.toString());

      // 如果不存在重复代码片段则拼接
      if (!existingSnippets[newSnippet[message.data.tips].prefix]) {
        existingSnippets = { ...existingSnippets, ...newSnippet };
      } else {
        existingSnippets = newSnippet;
      }
      const updatedSnippetsContent = JSON.stringify(existingSnippets, null, 2);

      // 写入
      await vscode.workspace.fs.writeFile(
        snippetFilePath,
        Buffer.from(updatedSnippetsContent, "utf-8"),
      );
      vscode.window.showInformationMessage("代码片段添加成功!");
    } catch (error) {
      vscode.window.showErrorMessage(`代码片段添加失败: ${error}`);
    }
  };
  writesnippetFilePath();
};
