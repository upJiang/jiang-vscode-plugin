import * as vscode from "vscode";
import { registerCreateScript } from "./commands/createScript";
import { registerCreateSnippets } from "./commands/createSnippets";
import { registerCreateSetting } from "./commands/createSetting";
import { registerCreateChatGPTView } from "./commands/createChatGPTView";

export function activate(context: vscode.ExtensionContext) {
  registerCreateScript(context);
  registerCreateSnippets(context);
  registerCreateSetting(context);
  registerCreateChatGPTView(context);
}

export function deactivate() {}
