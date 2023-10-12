import * as vscode from 'vscode';

// 一旦你的插件激活，vscode会立刻调用下述方法
export function activate(context: vscode.ExtensionContext) {
	// registerCommand中的参数必须与package.json中的command保持一致
	let disposable = vscode.commands.registerCommand('jiangvscodeplugin.helloWorld', () => {
		// 给用户显示一个消息提示
		vscode.window.showInformationMessage('Hello World from jiangVsCodePlugin!!!!>>>>');
	});

	context.subscriptions.push(disposable);
}

// 插件关闭前执行清理工作
export function deactivate() {}
