import * as vscode from "vscode";
import { registerCreateScript } from "./commands/createScript";
import { registerCreateSnippets } from "./commands/createSnippets";
import { registerCreateSetting } from "./commands/createSetting";

export function activate(context: vscode.ExtensionContext) {
  registerCreateScript(context);
  registerCreateSnippets(context);
  registerCreateSetting(context);
}

export function deactivate() {}
