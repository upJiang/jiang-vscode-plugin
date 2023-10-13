import * as vscode from "vscode";

// 一旦你的插件激活，vscode会立刻调用下述方法
export function activate(context: vscode.ExtensionContext) {
  // 命令中输入弹出信息
  let disposable = vscode.commands.registerCommand(
    "jiangvscodeplugin.helloWorld",
    () => {
      // 给用户显示一个消息提示
      vscode.window.showInformationMessage(
        "Hello World from jiangVsCodePlugin!!!!>>>>",
      );
    },
  );

  const webviewTest = vscode.commands.registerCommand("catCoding.start", () => {
    // 创建并显示新的webview
    const panel = vscode.window.createWebviewPanel(
      "catCoding", // 只供内部使用，这个webview的标识
      "Cat Coding", // 给用户显示的面板标题
      vscode.ViewColumn.One, // 给新的webview面板一个编辑器视图
      {}, // Webview选项。我们稍后会用上
    );
    // 设置HTML内容
    panel.webview.html = getWebviewContent();

    // 当webview被关闭时执行，可以处理一些操作
    panel.onDidDispose(
      () => {
        // 当面板关闭时，取消webview内容之后的更新
        console.log("webview关闭");
      },
      null,
      context.subscriptions,
    );
  });

  function getWebviewContent() {
    return `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Cat Coding</title>
	</head>
	<body>
		<img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
	</body>
	</html>
	`;
  }

  context.subscriptions.push(disposable);
  context.subscriptions.push(webviewTest);
}

// 插件关闭前执行清理工作
export function deactivate() {}
