import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";
import { checkUser } from "../api";
import { ROUTES } from "../constants";
import Layout from "../pages/Layout.vue";
import Login from "../pages/Login.vue";
import Recover from "../pages/Recover.vue";
import Register from "../pages/Register.vue";
import AnalisisPage from "../pages/AnalisisPage.vue";
import DoRecover from "../pages/DoRecover.vue";
import { store } from "../store";

const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.LOGIN.route,
    name: ROUTES.LOGIN.name,
    component: Login,
    meta: ROUTES.LOGIN.meta,
  },
  {
    path: ROUTES.RECOVERY.route,
    name: ROUTES.RECOVERY.name,
    component: Recover,
    meta: ROUTES.RECOVERY.meta,
  },
  {
    path: ROUTES.DORECOVERY.route,
    name: ROUTES.DORECOVERY.name,
    component: DoRecover,
    meta: ROUTES.DORECOVERY.meta,
  },
  {
    path: ROUTES.REGISTER.route,
    name: ROUTES.REGISTER.name,
    component: Register,
    meta: ROUTES.REGISTER.meta,
  },
  {
    path: ROUTES.HOME.route,
    name: ROUTES.HOME.name,
    component: Layout,
    meta: ROUTES.HOME.meta,
  },
  {
    path: ROUTES.ANALISIS.route,
    name: ROUTES.ANALISIS.name,
    component: AnalisisPage,
    meta: ROUTES.ANALISIS.meta,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const result = await checkUser();
  store.commit('setUser', result.data);

  if (!result.error && !to.meta.isProtected) {
    next({ name: ROUTES.HOME.name });
  } else if (result.error && to.meta.isProtected) {
    next({ name: ROUTES.LOGIN.name });
  } else {
    next();
  }
});

export default router;
