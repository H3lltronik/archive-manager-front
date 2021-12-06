import { createWebHistory, createRouter } from "vue-router";
import Layout from "../pages/Layout.vue";
import Login from "../pages/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Layout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;