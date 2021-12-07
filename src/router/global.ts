import { createWebHistory, createRouter } from "vue-router";
import { ROUTES } from "../constants";
import Layout from "../pages/Layout.vue";
import Login from "../pages/Login.vue";
import Recover from "../pages/Recover.vue";

const routes = [
  {
    path: ROUTES.LOGIN.route,
    name: ROUTES.LOGIN.name,
    component: Login,
  },
  {
    path: ROUTES.RECOVERY.route,
    name: ROUTES.RECOVERY.name,
    component: Recover,
  },
  {
    path: ROUTES.HOME.route,
    name: ROUTES.HOME.name,
    component: Layout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;