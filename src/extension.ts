import * as vscode from "vscode";
import { registerCreateScript } from "./commands/createScript";
import { registerCreateSnippets } from "./commands/createSnippets";

export function activate(context: vscode.ExtensionContext) {
  registerCreateScript(context);
  registerCreateSnippets(context);
}

export function deactivate() {}
