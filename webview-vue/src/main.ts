import { createApp } from 'vue'
import router from './router'
import Antd from 'ant-design-vue'
import App from './App.vue'

import { initMessageListener } from '@/utils/vscodeUtils'

const app = createApp(App)

app.use(router)
app.use(Antd)
app.mount('#app')

initMessageListener() // 执行监听

// 初始化完毕，通知 vscode 已经加载完了
vscode.postMessage({ cmd: 'webviewLoaded' })
