<script setup>
import CardBox from "@/components/CardBox.vue";
import baseApi from "../api/baseApi";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

import { mdiForwardburger } from "@mdi/js";
import { Plus, Edit, Delete, Check, Close } from "@element-plus/icons-vue";

const propsData = defineProps({
  dataTable: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  dialogVisible: {
    type: Boolean,
    required: true,
  },
});

const mode = computed(() => {
  return propsData.title;
});

const emit = defineEmits([
  "update:dialogVisible",
  "createForwarder",
  "editForwarder",
  "deleteForwarder",
]);

const tableLayout = ref("fixed");

const createForwarder = () => {
  emit("createForwarder");
};

const form = ref({
  name: "",
  enabled: false,
  serial: {
    baudRate: 19200,
    dataBits: 8,
    delay: 1,
    handShake: "none",
    parity: "none",
    port: "",
    receiveTimeout: 0,
    sendTimeout: 0,
    stopBits: "one",
  },
  tcpServer: {
    endPoints: [
      {
        address: "0.0.0.0",
        allow: [],
        port: 0,
        receiveTimeout: 0,
        sendTimeout: 0,
      },
    ],
    maxConnection: 0,
  },
  tcpClient: {
    endPoints: [
      {
        address: "",
        port: 0,
        receiveTimeout: 0,
        sendTimeout: 0,
      },
    ],
    mode: "Circular",
    priorityIndex: 0,
    priorityKeepOldConnection: false,
  },
});

const oldName = ref("");

const handleClose = (done) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      emit("update:dialogVisible", false);
    })
    .catch(() => {
      // catch error
    });
};

const handleEdit = (index, data) => {
  oldName.value = data.name;
  form.value = JSON.parse(JSON.stringify(data));
  if (data.tcpServer.endPoints.length === 0) {
    form.value.tcpServer.endPoints = [
      {
        address: "0.0.0.0",
        allow: [],
        port: 0,
        receiveTimeout: 0,
        sendTimeout: 0,
      },
    ];
  }
  if (data.tcpClient) {
    if (data.tcpClient.endPoints.length === 0) {
      form.value.tcpClient.endPoints = [
        {
          address: "",
          port: 0,
          receiveTimeout: 0,
          sendTimeout: 0,
        },
      ];
    }
  }

  emit("update:dialogVisible", true);
};

const onSubmit = () => {
  emit("editForwarder", form.value, oldName.value);
};

const handleDelete = (index, data) => {
  ElMessageBox.confirm(
    "Will permanently delete the forwarder. Continue?",
    "Warning",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(() => {
      emit("deleteForwarder", index, data);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
</script>

<template>
  <CardBox>
    <SectionTitleLineWithButton
      :icon="mdiForwardburger"
      :title="propsData.title"
    >
      <el-tooltip
        class="box-item"
        effect="dark"
        content="Create new forwarder"
        placement="top-start"
      >
        <el-button
          type="default"
          :icon="Plus"
          circle
          @click="createForwarder"
        />
      </el-tooltip>
    </SectionTitleLineWithButton>
    <el-table :data="dataTable" :table-layout="tableLayout">
      <el-table-column prop="name" label="Name" width="180" fixed />
      <el-table-column
        v-if="mode === 'Serial Forwarder'"
        prop="serial.baudRate"
        label="Baud Rate"
        align="center"
      />
      <el-table-column
        v-if="mode === 'Serial Forwarder'"
        prop="serial.port"
        label="Active Port"
        align="center"
      />
      <el-table-column
        width="120"
        v-if="mode === 'TCP Forwarder'"
        prop="tcpClient.endPoints[0].address"
        label="Client Address"
        align="center"
      />
      <el-table-column
        v-if="mode === 'TCP Forwarder'"
        prop="tcpClient.endPoints[0].port"
        width="110"
        label="Active Port"
        align="center"
      />
      <el-table-column
        prop="tcpServer.endPoints[0].port"
        label="Server Port"
        width="90"
        align="center"
      />
      <el-table-column prop="enabled" label="Status" fixed="right" width="70">
        <template #default="scope">
          <el-tag
            :type="scope.row.enabled === true ? 'success' : 'danger'"
            disable-transitions
            >{{ scope.row.enabled }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" width="120">
        <template #default="scope">
          <el-button
            size="small"
            :icon="Edit"
            @click="handleEdit(scope.$index, scope.row)"
            class="mr-1"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            :icon="Delete"
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </CardBox>

  <!-- dialog edit forwarder  -->
  <el-dialog
    v-model="dialogVisible"
    title="Edit Forwarder"
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      :model="form"
      label-width="120px"
      label-position="left"
      size="small"
    >
      <el-switch
        v-model="form.enabled"
        size="large"
        class="mb-3"
        inline-prompt
        :active-icon="Check"
        :inactive-icon="Close"
      />
      <el-form-item label="Activity name">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-divider border-style="dotted" />
      <el-form-item label="TCP Server Port">
        <el-input-number v-model.number="form.tcpServer.endPoints[0].port" />
      </el-form-item>
      <el-divider border-style="dotted" />
      <div v-if="propsData.dataTable[0].serial">
        <el-form-item label="Serial Port">
          <el-input v-model="form.serial.port" />
        </el-form-item>
        <el-form-item label="Baud Rate">
          <el-input-number v-model.number="form.serial.baudRate" />
        </el-form-item>
        <el-form-item label="DataBits">
          <el-input-number v-model.number="form.serial.dataBits" />
        </el-form-item>
        <el-form-item label="StopBits">
          <el-select
            v-model="form.serial.stopBits"
            placeholder="please select your zone"
          >
            <el-option label="One" value="one" />
            <el-option label="One Point Five" value="onepointfive" />
            <el-option label="Two" value="two" />
          </el-select>
        </el-form-item>
        <el-form-item label="Parity">
          <el-select
            v-model="form.serial.parity"
            placeholder="please select your zone"
          >
            <el-option label="None" value="none" />
            <el-option label="Odd" value="odd" />
            <el-option label="Even" value="even" />
          </el-select>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="TCP Client IP">
          <el-input v-model="form.tcpClient.endPoints[0].address" />
        </el-form-item>
        <el-form-item label="TCP Client Port">
          <el-input-number v-model.number="form.tcpClient.endPoints[0].port" />
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:dialogVisible', false)" class="mr-1"
          >Cancel</el-button
        >
        <el-button type="primary" @click="onSubmit"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>
