import { createRouter, createWebHashHistory } from 'vue-router'

const moduleList = import.meta.globEager('./modules/**')

let routes = Object.keys(moduleList).reduce<any[]>(
  (pre, k) => [...pre, ...moduleList[k].default],
  []
)
// 去重
routes = Array.from(new Set(routes))

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
