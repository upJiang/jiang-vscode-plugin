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
  const snippetFile = vscode.Uri.joinPath(
    context.extensionUri,
    ".vscode",
    "test.code-snippets",
  );
  console.log("message", message);
  console.log("snippetFile", snippetFile);

  // 创建代码片段
  const testSnippet = {
    [message.data.tips]: {
      prefix: message.data?.prefix,
      body: [message.data?.body],
      description: message.data?.description,
    },
  };

  // 将代码片段写入文件并添加到扩展程序
  const writeSnippetFile = async () => {
    try {
      const data = JSON.stringify(testSnippet, null, "\t");
      await vscode.workspace.fs.writeFile(snippetFile, Buffer.from(data));
      vscode.window.showInformationMessage("Snippet added successfully!");
    } catch (error) {
      vscode.window.showErrorMessage(`Error adding snippet: ${error}`);
    }
  };
  writeSnippetFile();
  console.log("此处执行");
};
