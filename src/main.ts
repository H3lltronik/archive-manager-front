import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/global";
import ElementPlus from "element-plus";
import { store, key } from "./store";

import "element-plus/dist/index.css";
import "./styles/main.scss";

createApp(App)
  .use(router)
  .use(ElementPlus)
  .use(store, key)
  .mount("#app");
