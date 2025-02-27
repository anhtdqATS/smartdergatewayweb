import { defineStore } from "pinia";
import baseApi from "../api/baseApi";
import { GatewayServiceId } from "@/Constants/index.js";
import cmdTypes from "../common/cmdTypes";
import { computed } from "vue";
import baseComposable from "@/Base/composable/";

export const useHomeStore = defineStore("homeStore", () => {
  const data = ref({
    AlarmStatus: {
      PM_HVRTDetectionStatus: false,
      PM_LVRTDetectionStatus: false,
      PM_Valid: false,
      P_Freq_OverDetection: false,
      P_Freq_UnderDetection: false,
    },
    ControlMode: {
      P_Freq_Enable_fb: false,
      P_Mode_fb: 0,
      Q_Mode_fb: 0,
    },
    Logs: [],
    OnlineStatus: {
      totalESS: 0,
      totalESSOnline: 0,
      totalIBR: 0,
      totalIBROnline: 0,
      totalPM: 0,
      totalPMOnline: 0,
      totalQComp: 0,
      totalQCompOnline: 0,
    },
    POI: {
      PM_F: 0,
      PM_P: 0,
      PM_Q: 0,
      PM_V: 0,
    },
    PlantInfo: {
      PF_Setpoint_fb: 0,
      P_Setpoint_fb: 5.0,
      Pnom: 10,
      Q_Setpoint_fb: 0,
      V_Setpoint_fb: 0,
      Vnom: 0,
    },
    Weathers: {
      AirPressure: 0,
      AmbientTemp: 0,
      HorizonalIrradiance: 0,
      Humidity: 0,
      ObjectTemp: 0,
      TitledIrradiance: 0,
      WindDirection: 0,
      WindSpeed: 0,
    },
  });
  const Logs = ref([]);
  const ObjectID = ref(null);
  const TypeID = ref(null);
  const loadDashboard = ref(false);
  const isLoadingContainer = ref(true);
  const { currentTime, timeNow } = baseComposable();
  const timeLogs = ref(0);
  const getDashboardChannel = async () => {
    await timeNow();
    const dataLoad = {
      receiver: GatewayServiceId,
      payload: {
        cmdType: cmdTypes.getDashboardChannel,
      },
    };

    try {
      const res = await baseApi.getDashboardChannel(dataLoad);
      if (res.data.error.length > 0) {
        isLoadingContainer.value = false;
      } else {
        ObjectID.value = res.data.payload.objectId;
        TypeID.value = res.data.payload.typeId;
        loadDashboard.value = true;
        timeLogs.value = currentTime.value;
        isLoadingContainer.value = false;
        getData();
      }
    } catch (err) {
      ElMessage({
        message: err,
        grouping: true,
        showClose: true,
        type: "error",
      });
    }
  };

  const getData = () => {
    if (ObjectID.value) {
      let dataLoad = {
        receiver: ObjectID.value,
        payload: {
          cmdType: cmdTypes.getDashboardData,
          timestamp: timeLogs.value,
        },
      };
      baseApi
        .getDashboardData(dataLoad)
        .then((res) => {
          if (res.data.error.length > 0) {
            ElMessage({
              message: "Data not return",
              grouping: true,
              showClose: true,
              type: "warning",
            });
          } else {
            data.value = res.data.payload;
            if (res.data.payload.Logs.length > 0) {
              Logs.value = [...Logs.value, ...res.data.payload.Logs];
              timeLogs.value =
                res.data.payload.Logs[res.data.payload.Logs.length - 1]
                  .TimeStamp + 1;
            }
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
    } else {
      getDashboardChannel();
    }
  };

  function roundFloatNumber(num) {
    return parseFloat(num.toFixed(2));
  }

  const PlantInfo = computed(() => {
    return data.value ? data.value.PlantInfo : null;
  });

  const POI = computed(() => {
    return data.value.POI;
  });

  const controlMode = computed(() => {
    return data.value.ControlMode;
  });
  const almarmStatus = computed(() => {
    return data.value.AlarmStatus;
  });
  const weathers = computed(() => {
    return data.value.Weathers;
  });

  const resetLogs = () => {
    Logs.value = [];
  };
  const onlineStatus = computed(() => {
    return data.value.OnlineStatus;
  });

  return {
    getData,
    getDashboardChannel,
    data,
    PlantInfo,
    POI,
    controlMode,
    almarmStatus,
    weathers,
    Logs,
    onlineStatus,
    ObjectID,
    TypeID,
    loadDashboard,
    resetLogs,
    roundFloatNumber,
    isLoadingContainer,
  };
});
