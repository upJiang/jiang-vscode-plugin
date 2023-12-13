import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const modules = import.meta.glob("./modules/**", {
  eager: true,
}) as Record<string, { default: RouteRecordRaw[] }>;

const routes = Object.keys(modules).map((s) => modules[s].default);

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes.flat(),
});

export default router;
