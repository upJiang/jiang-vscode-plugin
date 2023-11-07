import * as vscode from "vscode";
import { registerCreateScript } from "./commands/createScript";
import { registerRunWebView } from "./commands/runWenview";
import { registerCreateSnippets } from "./commands/createSnippets";

export function activate(context: vscode.ExtensionContext) {
  registerCreateScript(context);
  registerRunWebView(context);
  registerCreateSnippets(context);
}

export function deactivate() {}
