/* eslint-disable @typescript-eslint/no-explicit-any */

import router from '@/router'

const callbacks: { [propName: string]: (data: any) => void } = {}
const errorCallbacks: { [propName: string]: (data: any) => void } = {}

export function callVscode(
  data: { cmd: string; data?: any; skipError?: boolean },
  cb?: (data: any) => void,
  errorCb?: (data: any) => void
) {
  if (cb) {
    const cbid = `${Date.now()}${Math.round(Math.random() * 100000)}`
    callbacks[cbid] = cb
    vscode.postMessage({
      ...data,
      cbid,
    })
    if (errorCb) {
      errorCallbacks[cbid] = errorCb
    }
  } else {
    vscode.postMessage(data)
  }
}

export function callVscodePromise(cmd: string, data: any, skipError?: boolean) {
  return new Promise((resolve, reject) => {
    callVscode(
      { cmd, data, skipError },
      res => {
        resolve(res)
      },
      error => {
        reject(error)
      }
    )
  })
}

export function request<T = unknown>(params: { cmd: string; data?: any; skipError?: boolean }) {
  return new Promise<T>((resolve, reject) => {
    callVscode(
      { cmd: params.cmd, data: params.data, skipError: params.skipError },
      res => {
        resolve(res)
      },
      error => {
        reject(error)
      }
    )
  })
}

export const initMessageListener = () => {
  window.addEventListener('message', event => {
    console.log('监听中')
    const message = event.data
    switch (message.cmd) {
      // 来自vscode的回调
      case 'vscodeCallback':
        if (message.code === 200) {
          ;(callbacks[message.cbid] || function () {})(message.data)
        } else {
          ;(errorCallbacks[message.cbid] || function () {})(message.data)
        }
        delete callbacks[message.cbid]
        delete errorCallbacks[message.cbid]
        break
      // vscode 主动推送task
      case 'vscodePushTask' || 'addSnippets':
        if (taskHandler[message.task]) {
          taskHandler[message.task](message.data)
        } else {
          message.error(`未找到名为 ${message.task} 回调方法!`)
        }
        break
    }
  })
}

// 分发任务
export const taskHandler: {
  [propName: string]: (data: any) => void
} = {
  addSnippets: (data?: { content?: string }) => {
    // localStorage.setItem('addSnippets', data?.content || '')
    router.push(`/add-snippets`)
  },
  route: (data: { path: string }) => {
    router.push(data.path)
  },
}
