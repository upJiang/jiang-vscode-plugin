"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
// 一旦你的插件激活，vscode会立刻调用下述方法
function activate(context) {
    // registerCommand中的参数必须与package.json中的command保持一致
    let disposable = vscode.commands.registerCommand('jiangvscodeplugin.helloWorld', () => {
        // 给用户显示一个消息提示
        vscode.window.showInformationMessage('Hello World from jiangVsCodePlugin!!!!>>>>');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// 插件关闭前执行清理工作
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map