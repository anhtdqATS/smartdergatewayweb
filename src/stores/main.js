import { defineStore } from "pinia";
import axios from "axios";
import baseApi from "./base/baseApi";
import { GatewayServiceId } from "@/Constants/index.js";
import router from "../router/index";
export const useMainStore = defineStore("main", {
  state: () => ({
    /* User */
    userName: null,
    time: null,
    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,
    isLoading: false,
    /* Sample data (commonly used) */
    clients: [],
    history: [],
    gatewayInfo: Object,
    licenseInfo: [],
    nameGateway: "",
    channelDashboardObjectId: "",
    channelDashboardTypeId: "",
  }),
  actions: {
    setUser(payload) {
      if (payload.userName) {
        this.userName = payload.userName;
      }
      if (payload.time) {
        this.time = payload.time;
      }
    },

    setLoading(loading) {
      this.isLoading = loading;
    },

    fetch(sampleDataKey) {
      axios
        .get(`data-sources/${sampleDataKey}.json`)
        .then((r) => {
          if (r.data && r.data.data) {
            this[sampleDataKey] = r.data.data;
          }
        })
        .catch((error) => {
          ElMessage({
            message: error.message,
            grouping: true,
            showClose: true,
            type: "warning",
          });
        });
    },

    async getGatewayInfo() {
      let dataLoad = {
        receiver: GatewayServiceId,
        payload: {
          cmdType: 101,
        },
      };
      await baseApi
        .getGatewayInfo(dataLoad)
        .then((res) => {
          if (res.data.error.length > 0) {
            ElMessage({
              message: "Data not return",
              grouping: true,
              showClose: true,
              type: "warning",
            });
          } else {
            this.gatewayInfo = res.data.payload;
            localStorage.setItem("nameGateway", res.data.payload.name);
          }
        })
        .catch((err) => {
          ElMessage({
            message: err,
            grouping: true,
            showClose: true,
            type: "error",
          });
        });
    },

    setGatewayInfo(name) {
      let dataLoad = {
        receiver: GatewayServiceId,
        payload: {
          cmdType: 103,
          name: name,
        },
      };
      baseApi
        .setGatewayInfo(dataLoad)
        .then((res) => {
          if (res.data.error.length > 0) {
            ElMessage({
              message: "Data not return",
              grouping: true,
              showClose: true,
              type: "warning",
            });
          } else {
            this.getGatewayInfo();
            if (name === "") {
              document.title =
                "DASBOX - " + router.currentRoute.value.meta.title;
            } else {
              document.title = router.currentRoute.value.meta?.title
                ? `${name} - ${router.currentRoute.value.meta.title}`
                : name;
            }
            ElMessage({
              message: "Update success",
              grouping: true,
              showClose: true,
              type: "success",
            });
          }
        })
        .catch((err) => {
          ElMessage({
            message: err,
            grouping: true,
            showClose: true,
            type: "error",
          });
        });
    },

    async getLicenseInfo() {
      const dataLoad = {
        receiver: GatewayServiceId,
        payload: {
          cmdType: 202,
        },
      };

      await baseApi
        .getLicenseInfo(dataLoad)
        .then((res) => {
          if (res.data.error.length > 0) {
            ElMessage({
              message: "Data not return",
              grouping: true,
              showClose: true,
              type: "warning",
            });
          } else {
            return res.data.payload.licInfo;
          }
        })
        .catch((err) => {
          ElMessage({
            message: err,
            grouping: true,
            showClose: true,
            type: "error",
          });
        });
    },
  },
});
