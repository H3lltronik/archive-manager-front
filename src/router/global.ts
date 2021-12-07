import { createWebHistory, createRouter } from "vue-router";
import { ROUTES } from "../constants";
import Layout from "../pages/Layout.vue";
import Login from "../pages/Login.vue";
import Recover from "../pages/Recover.vue";
import Register from "../pages/Register.vue";

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
    path: ROUTES.REGISTER.route,
    name: ROUTES.REGISTER.name,
    component: Register,
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