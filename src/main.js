import { createApp } from "vue";
import { createPinia } from "pinia";
// import "default-passive-events";
import "../polyfill.js";
import App from "./App.vue";
import router from "./router";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import { darkModeKey, styleKey } from "@/config.js";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./css/main.css";
// import dark theme
/* Init Pinia */
const pinia = createPinia();

/* Create Vue app */
createApp(App).use(router).use(pinia).mount("#app");

/* Init Pinia stores */
const mainStore = useMainStore(pinia);
const styleStore = useStyleStore(pinia);

/* Fetch sample data */
// mainStore.fetch("clients");
// mainStore.fetch("history");
// const nameDevice = computed(() => {
//   return mainStore.nameGateway.value;
// });
/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(true);
}

/* Default title tag */

/* Set document title from route meta */
