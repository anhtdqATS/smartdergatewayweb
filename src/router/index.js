import { createRouter, createWebHashHistory } from "vue-router";
import { useMainStore } from "@/stores/main.js";

import Login from "@/module/login/view/LoginView.vue";
// const mainStore = useMainStore();
const routes = [
  {
    meta: {
      title: "Login",
    },
    path: "/",
    name: "login",
    component: Login,
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
    },
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/view/home.vue"),
  },
  {
    meta: {
      title: "Cellular",
    },
    path: "/cellular",
    name: "cellular",
    component: () => import("@/module/gatewayCellular/view/CellularView.vue"),
  },
  {
    meta: {
      title: "OpenVPN",
    },
    path: "/openVPN",
    name: "openVPN",
    component: () => import("@/module/gatewayVPN/openVPN/view/OpenVPNView.vue"),
  },
  {
    meta: {
      title: "Network",
    },
    path: "/network",
    name: "network",
    component: () => import("@/module/smartDer/network/view/NetworkView.vue"),
  },
  {
    meta: {
      title: "System",
    },
    path: "/system",
    name: "system",
    component: () => import("@/module/smartDer/system/view/SystemView.vue"),
  },
  {
    meta: {
      title: "Channel",
    },
    path: "/channel",
    name: "channel",
    component: () => import("@/module/gatewaychannel/view/Setting.vue"),
  },
  {
    meta: {
      title: "Mapping",
    },
    path: "/mapping",
    name: "mapping",
    component: () => import("@/module/gatewayMapping/view/index.vue"),
  },
  {
    meta: {
      title: "Session Log",
    },
    path: "/sessionLog",
    name: "sessionLog",
    component: () => import("@/module/gatewayLogs/view/sessionLog.vue"),
  },
  {
    meta: {
      title: " Service Log",
      transition: "slide-left",
    },
    path: "/serviceLog",
    name: "serviceLog",
    component: () => import("@/module/gatewayLogs/view/serviceLog.vue"),
  },
  {
    meta: {
      title: "ChartViewer",
    },
    path: "/chartViewer",
    name: "ChartViewer",
    component: () => import("@/module/RecordeModule/view/recorder.vue"),
  },
  {
    meta: {
      title: "Profile",
      transition: "slide-left",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/module/profile/view/ProfileView.vue"),
  },
  {
    meta: {
      title: "Forwarder layout",
    },
    path: "/forwarder",
    name: "Forwarder",
    component: () => import("@/module/forwarder/view/ForwarderView.vue"),
  },

  {
    meta: {
      title: "About",
    },
    path: "/about",
    name: "about",
    component: () => import("@/module/Info/view/About.vue"),
  },
  {
    meta: {
      title: "License",
    },
    path: "/license",
    name: "license",
    component: () => import("@/module/Info/view/LicenseView.vue"),
  },
  {
    meta: {
      title: "ImportExport",
    },
    path: "/import-export",
    name: "import-export",
    component: () =>
      import("@/module/smartDer/importExport/view/ImportExportView.vue"),
  },
  {
    meta: {
      title: "UpdateFirmware",
    },
    path: "/update-firmware",
    name: "updateFirmware",
    component: () =>
      import("@/module/smartDer/updateFirmware/view/updateFirmware.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  var dataLogin = localStorage.getItem("dataLogin");
  if (!dataLogin && to.name !== "login") {
    return { name: "login" };
  }
  useMainStore().setLoading(true);
  next();
});

router.afterEach((to, from) => {
  useMainStore().setLoading(false);
});

export default router;
