import { createRouter, createWebHashHistory } from "vue-router";
import commom from "./modules/commom";
import snippets from "./modules/snippets";

// const moduleList = import.meta.globEager('./modules/**')

// let routes = Object.keys(moduleList).reduce<any[]>(
//   (pre, k) => [...pre, ...moduleList[k].default],
//   []
// )
// // 去重
// routes = Array.from(new Set(routes))

const routes = [
  ...commom,
  ...snippets,
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
