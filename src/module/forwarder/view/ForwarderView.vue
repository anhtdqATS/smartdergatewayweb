<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import tableComponent from "../components/table.vue";
import cmdTypes from "../cmdTypes";
import { useMainStore } from "@/stores/main.js";

import baseApi from "../api/baseApi";
import Loading from "@/components/Loading.vue";
import { mdiArrangeBringForward } from "@mdi/js";

const tableDataSerial = ref([]);
const tableDataTCP = ref([]);
const dialogSerial = ref(false);
const dialogTCP = ref(false);

const dialogVisibleSerial = computed({
  get: () => {
    return dialogSerial.value;
  },
  set: (v) => {
    dialogSerial.value = v;
  },
});

const dialogVisibleTCP = computed({
  get: () => {
    return dialogTCP.value;
  },
  set: (v) => {
    dialogTCP.value = v;
  },
});

const getSetting = () => {
  const dataLoad = {
    receiver: cmdTypes.ForwarderType,
    payload: {
      cmdType: cmdTypes.getSettings,
    },
  };

  baseApi
    .getSettings(dataLoad)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        (tableDataSerial.value = res.data.payload.serial),
          (tableDataTCP.value = res.data.payload.tcp);
      }
    })
    .catch((err) => {
      ElMessage({
        message: err,
        grouping: true,
        showClose: true,
        type: "error",
      });
      return false;
    });
};
getSetting();

const createSerialForwarder = () => {
  const dataLoad = {
    receiver: cmdTypes.ForwarderType,
    payload: {
      cmdType: cmdTypes.createSerialForwarder,
    },
  };

  baseApi
    .getSettings(dataLoad)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        tableDataSerial.value.push(res.data.payload);
      }
    })
    .catch((err) => {
      ElMessage({
        message: err,
        grouping: true,
        showClose: true,
        type: "error",
      });
      return false;
    });
};

const createTCPForwarder = () => {
  const dataLoad = {
    receiver: cmdTypes.ForwarderType,
    payload: {
      cmdType: cmdTypes.createTCPForwarder,
    },
  };

  baseApi
    .getSettings(dataLoad)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        tableDataTCP.value.push(res.data.payload);
      }
    })
    .catch((err) => {
      ElMessage({
        message: err,
        grouping: true,
        showClose: true,
        type: "error",
      });
      return false;
    });
};

const editSerialForwarder = (param, oldName) => {
  delete param.tcpClient;
  param.cmdType = cmdTypes.updateSerialForwarder;
  param.oldName = oldName;
  const dataLoad = {
    receiver: cmdTypes.ForwarderType,
    payload: param,
  };

  baseApi
    .updateSerialForwarder(dataLoad)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        getSetting();
        ElMessage({
          message: "Update success !",
          grouping: true,
          showClose: true,
          type: "success",
        });
        dialogVisibleSerial.value = false;
      }
    })
    .catch((err) => {
      ElMessage({
        message: err,
        grouping: true,
        showClose: true,
        type: "error",
      });
      return false;
    });
};

const editTCPForwarder = (param, oldName) => {
  delete param.serial;
  param.cmdType = cmdTypes.updateTCPForwarder;
  param.oldName = oldName;
  const dataLoad = {
    receiver: cmdTypes.ForwarderType,
    payload: param,
  };
  baseApi
    .updateTCPForwarder(dataLoad)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        getSetting();
        ElMessage({
          message: "Update success !",
          grouping: true,
          showClose: true,
          type: "success",
        });
        dialogVisibleTCP.value = false;
      }
    })
    .catch((err) => {
      ElMessage({
        message: err,
        grouping: true,
        showClose: true,
        type: "error",
      });
      return false;
    });
};
const deleteSerialForwarder = (index, data) => {
  const dataLoad = {
    receiver: cmdTypes.ForwarderType,
    payload: {
      cmdType: cmdTypes.deleteSerialForwarder,
      name: data.name,
    },
  };

  baseApi
    .deleteSerialForwarder(dataLoad)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        tableDataSerial.value.splice(index, 1);
      }
    })
    .catch((err) => {
      ElMessage({
        message: err,
        grouping: true,
        showClose: true,
        type: "error",
      });
      return false;
    });
};

const deleteTCPForwarder = (index, data) => {
  const dataLoad = {
    receiver: cmdTypes.ForwarderType,
    payload: {
      cmdType: cmdTypes.deleteTCPForwarder,
      name: data.name,
    },
  };

  baseApi
    .getSettings(dataLoad)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        tableDataTCP.value.splice(index, 1);
      }
    })
    .catch((err) => {
      ElMessage({
        message: err,
        grouping: true,
        showClose: true,
        type: "error",
      });
      return false;
    });
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiArrangeBringForward"
        title="Forwarder"
        main
      >
      </SectionTitleLineWithButton>
      <div class="grid grid-cols-1 2xl:grid-cols-2 gap-6">
        <tableComponent
          title="Serial Forwarder"
          :dataTable="tableDataSerial"
          v-model:dialogVisible="dialogVisibleSerial"
          @createForwarder="createSerialForwarder"
          @editForwarder="editSerialForwarder"
          @deleteForwarder="deleteSerialForwarder"
        ></tableComponent>
        <tableComponent
          title="TCP Forwarder"
          :dataTable="tableDataTCP"
          v-model:dialogVisible="dialogVisibleTCP"
          @createForwarder="createTCPForwarder"
          @editForwarder="editTCPForwarder"
          @deleteForwarder="deleteTCPForwarder"
        ></tableComponent>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
