import * as vscode from "vscode";

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
  // 指定文件路径
  const snippetFilePath = vscode.Uri.joinPath(
    context.extensionUri,
    ".vscode",
    "test.code-snippets",
  );
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

      // 读取原有文件内容
      const snippetsFileContent =
        await vscode.workspace.fs.readFile(snippetFilePath);
      existingSnippets = JSON.parse(snippetsFileContent.toString());

      // 如果不存在重复代码片段则拼接
      if (!existingSnippets[newSnippet[message.data.tips].prefix]) {
        existingSnippets = { ...existingSnippets, ...newSnippet };
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
