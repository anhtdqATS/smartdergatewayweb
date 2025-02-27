<script setup>
import { mdiForwardburger, mdiBackburger, mdiMenu } from "@mdi/js";
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import menuAside from "@/menuAside.js";
import menuNavBar from "@/menuNavBar.js";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import BaseIcon from "@/components/BaseIcon.vue";
import FormControl from "@/components/FormControl.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarItemPlain from "@/components/NavBarItemPlain.vue";
import AsideMenu from "@/components/AsideMenu.vue";
import FooterBar from "@/components/FooterBar.vue";
import mainApi from "./api/mainApi";
import { GatewayServiceId } from "../Constants/index.js";
import Loading from "@/components/Loading.vue";

const store = useMainStore();

const dataLogin = computed(() => JSON.parse(localStorage.getItem("dataLogin")));
const d = new Date(dataLogin.value.dataTime);
const time = d.toLocaleString("es-AR");

useMainStore().setUser({
  userName: dataLogin.value.user,
  time: time,
});

useMainStore().getGatewayInfo();

const layoutAsidePadding = "xl:pl-60";

const styleStore = useStyleStore();
const router = useRouter();

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);
let isTimer = null;
router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});

const darkMode = computed(() => {
  return useStyleStore().darkMode;
});
const r = document.querySelector(":root");

const setElementPlusDarkMode = () => {
  if (darkMode.value) {
    r.style.setProperty("--bg-node-tree", "#141c2f");
    r.style.setProperty("--el-bg-color", "#141c2f");
  } else {
    r.style.setProperty("--bg-node-tree", "#f5f7fa");
    r.style.setProperty("--el-bg-color", "#fff");
  }
};
setElementPlusDarkMode();
watch(darkMode, () => {
  setElementPlusDarkMode();
});
const removeSessions = () => {
  localStorage.removeItem("dataLogin");
  mainApi.removeAuthorizationHeaders();
  router.push("/");
};

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    styleStore.setDarkMode();
  }

  if (item.isLogout) {
    Logout();
  }
  if (item.isSaveGateway) {
    saveGatewayConfig();
  }
};
//Save gateway
const saveGatewayConfig = () => {
  let data = {
    receiver: GatewayServiceId,
    payload: {
      cmdType: 1,
    },
  };
  mainApi
    .save(data)
    .then((response) => {
      if (response.data.error.length > 0) {
        ElMessage({
          type: "warning",
          message: "Data not return",
        });
      } else {
        ElMessage({
          type: "success",
          message: "save config success",
        });
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        this.logout();
      }
      ElMessage({
        type: "error",
        message: "Server error",
      });
    });
};

//Logout
const Logout = () => {
  mainApi
    .logout()
    .then(() => {
      removeSessions();
    })
    .catch(() => {});
};

//PING API

const Ping = () => {
  mainApi
    .ping()
    .then(() => {})
    .catch((err) => {
      if (err.response.status === 401) {
        removeSessions();
      }
    });
};
onMounted(() => {
  isTimer = setInterval(Ping, 3000);
});
onUnmounted(() => clearInterval(isTimer));
</script>

<template>
  <div
    :class="{
      dark: styleStore.darkMode,
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[
          layoutAsidePadding,
          { 'ml-60 lg:ml-0': isAsideMobileExpanded },
        ]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon
            :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger"
            size="24"
          />
        </NavBarItemPlain>
        <NavBarItemPlain
          display="hidden lg:flex xl:hidden"
          @click.prevent="isAsideLgActive = true"
        >
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
        <!-- <NavBarItemPlain use-margin>
          <FormControl
            placeholder="Search (ctrl+k)"
            ctrl-k-focus
            transparent
            borderless
          />
        </NavBarItemPlain> -->
      </NavBar>
      <AsideMenu
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAside"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <Loading v-if="useMainStore().isLoading"></Loading>

      <slot v-else />
      <FooterBar>
        Get more with
        <a
          href="https://ats.com.vn/contact/"
          target="_blank"
          class="text-blue-600"
          >Contact</a
        >
      </FooterBar>
    </div>
  </div>
</template>
