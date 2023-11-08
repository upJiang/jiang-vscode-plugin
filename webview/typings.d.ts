interface IVscode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postMessage(message: any): void
}
// declare function acquireVsCodeApi(): vscode;
declare let vscode: IVscode
