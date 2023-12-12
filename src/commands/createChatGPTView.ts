import {
  commands,
  ExtensionContext,
  WebviewView,
  WebviewViewProvider,
  window,
  workspace,
} from "vscode";
import { getHtmlForWebview } from "../utils/webviewUtils";

// 实现 Webview 视图提供者接口，以下内容都是 chatGPT 提供
class MyWebviewViewProvider implements WebviewViewProvider {
  public webview?: WebviewView["webview"];
  constructor(private context: ExtensionContext) {
    this.context = context;
  }
  resolveWebviewView(webviewView: WebviewView): void {
    this.webview = webviewView.webview;
    // 设置 enableScripts 选项为 true
    webviewView.webview.options = {
      enableScripts: true,
    };
    // 设置 Webview 的内容
    webviewView.webview.html = getHtmlForWebview(
      this.context,
      webviewView.webview,
    );

    webviewView.webview.onDidReceiveMessage(
      (message: {
        cmd: string;
        cbid: string;
        data: any;
        skipError?: boolean;
      }) => {
        // 监听webview反馈回来加载完成，初始化主动推送消息
        if (message.cmd === "webviewLoaded") {
          // 获取本插件的设置
          const config = workspace.getConfiguration("CodeToolBox");
          const hostname = config.get("hostname");
          const apiKey = config.get("apiKey");
          console.log("设置的hostname:", hostname);
          console.log("设置的apiKey:", apiKey);
          webviewView.webview.postMessage({
            cmd: "vscodePushTask",
            task: "route",
            data: {
              path: "/chat-gpt-view",
              query: {
                hostname,
                apiKey,
              },
            },
          });
        }
      },
    );
  }

  // 销毁
  removeWebView() {
    if (this.webview) {
      this.webview = undefined;
    }
  }
}

let webviewViewProvider: MyWebviewViewProvider | undefined;
export const registerCreateChatGPTView = (context: ExtensionContext) => {
  context.subscriptions.push(
    commands.registerCommand("CodeToolBox.chatGPTView", () => {
      commands
        .executeCommand("workbench.view.extension.CodeToolBox")
        .then(() => {
          // 设置 CodeToolBox.chatGPTView 为true，这样才能显示，"when": "CodeToolBox.chatGPTView"
          commands
            .executeCommand("setContext", "CodeToolBox.chatGPTView", true)
            .then(() => {
              // 注册 webview 视图
              webviewViewProvider = new MyWebviewViewProvider(context);
              context.subscriptions.push(
                window.registerWebviewViewProvider(
                  "CodeToolBox.chatGPTView",
                  webviewViewProvider,
                  {
                    webviewOptions: {
                      retainContextWhenHidden: true,
                    },
                  },
                ),
              );
            });
        });
    }),

    // 关闭
    commands.registerCommand("CodeToolBox.hideChatGPTView", () => {
      commands
        .executeCommand("setContext", "CodeToolBox.chatGPTView", false)
        .then(() => {
          webviewViewProvider?.removeWebView();
        });
    }),
  );
};
