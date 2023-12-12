declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $TRACK: string;
    $TipsDialog: Function;
  }
}

interface IVscode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postMessage(message: any): void;
}
// declare function acquireVsCodeApi(): vscode;
declare let vscode: IVscode;

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vscode: any;
}
