import DSA_DashboardsEmpty from "../childDashboard/components/dashboardsEmpty.vue";

import topWidget from "../home/topWidget.vue";
import PoiMea from "../home/PoiMea.vue";
import ControlMode from "../home/ControlMode.vue";
import AlarmStatus from "../home/AlarmStatus.vue";
import OnlineStatus from "../home/OnlineStatus.vue";
import logTable from "../home/logTable.vue";
const defaultSetting = {
  type: "horizontal",
  size: 1,
  component: "Top",

  children: [
    {
      component: "Top",
      meta: {
        color: "rgb(241, 131, 131)",
      },
      type: "panel",
      size: 1,
    },
    // {
    //   type: "vertical",
    //   size: 1,
    //   children: [
    //     {
    //       component: "RADAR",
    //       meta: {
    //         color: "rgb(241, 131, 186)",
    //       },
    //       type: "panel",
    //       size: 0.5,
    //     },
    //     {
    //       type: "panel",
    //       size: 0.5,
    //       component: "RADAR",
    //       meta: {
    //         color: "rgb(241, 131, 186)",
    //       },
    //     },
    //   ],
    // },
    // {
    //   type: "vertical",
    //   size: 1,
    //   children: [
    //     {
    //       component: "OnlineStatus",
    //       meta: {
    //         color: "rgb(241, 131, 186)",
    //       },
    //       type: "panel",
    //       size: 0.5,
    //     },
    //     {
    //       type: "panel",
    //       size: 0.5,
    //       component: "AlarmStatus",
    //       meta: {
    //         color: "rgb(241, 131, 186)",
    //       },
    //     },
    //   ],
    // },
    // {
    //   type: "vertical",
    //   size: 1,
    //   children: [
    //     {
    //       component: "ControlMode",
    //       meta: {
    //         color: "rgb(241, 131, 186)",
    //       },
    //       type: "panel",
    //       size: 0.5,
    //     },
    //     {
    //       type: "panel",
    //       size: 0.5,
    //       component: "logTable",
    //       meta: {
    //         color: "rgb(241, 131, 186)",
    //       },
    //     },
    //   ],
    // },
  ],
};
const saveSettingLocalStorage = (data) => {
  localStorage.setItem("dashboard-layout-storage", JSON.stringify(data));
};
const loadSettingLocalStorage = () => {
  let data = ref(defaultSetting);
  try {
    let savedLayoutData = JSON.parse(
      localStorage.getItem("dashboard-layout-storage")
    );
    data = savedLayoutData._value;
  } catch (error) {}

  return data;
};
const getComponent = (name) => {
  if (name === "Top") {
    return topWidget;
  } else if (name === "PoiMea") {
    return PoiMea;
  } else if (name === "ControlMode") {
    return ControlMode;
  } else if (name === "AlarmStatus") {
    return AlarmStatus;
  } else if (name === "OnlineStatus") {
    return OnlineStatus;
  } else if (name === "logTable") {
    return logTable;
  } else {
    return DSA_DashboardsEmpty; //{ render: (h) => h('p', '404 component not found') };
  }
};
const handleDragstart = (e) => {
  console.log(e);
  let srcData = e.srcElement.id;
  const data = {
    component: srcData,
    meta: {
      color: e.target.style.backgroundColor,
    },
  };
  e.dataTransfer.setData("text", JSON.stringify(data));
};
const dirkChange = (data) => {
  localStorage.setItem("dirk-data", JSON.stringify(data));
};
const toPDF = () => {
  window.print();
};
export default {
  defaultSetting,
  saveSettingLocalStorage,
  loadSettingLocalStorage,
  getComponent,
  handleDragstart,
  dirkChange,
  toPDF,
};
