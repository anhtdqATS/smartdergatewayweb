<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import { genFileId } from "element-plus";

import { GatewayServiceId } from "@/Constants/index.js";
import cmdTypes from "../cmdTypes";

import { mdiLicense } from "@mdi/js";
import {
  Cpu,
  UploadFilled,
  Select,
  CircleCloseFilled,
  InfoFilled,
} from "@element-plus/icons-vue";
import baseApi from "../api/baseApi";

const machineCode = ref([]);
const licenseInfo = ref([]);
const dialogVisible = ref(false);

const getMachineCode = () => {
  const dataLoad = {
    receiver: GatewayServiceId,
    payload: {
      cmdType: cmdTypes.getMachineCode,
    },
  };

  baseApi
    .getMachineCode(dataLoad)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        machineCode.value = res.data.payload.machineCode;
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
};
getMachineCode();

const getLicenseInfo = () => {
  openFullScreenLoading();
  const dataLoad = {
    receiver: GatewayServiceId,
    payload: {
      cmdType: cmdTypes.getLicenseInfo,
    },
  };

  baseApi
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
        licenseInfo.value = res.data.payload.licInfo;
        dialogVisible.value = true;
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
};

// upload License
const fileImport = ref();
const upload = ref();
const handleExceedUpload = (files) => {
  console.log("handleExceedUpload");
  upload.value.clearFiles();
  console.log(files);
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
};
const handChangeUpload = (files) => {
  console.log("handChangeUpload");
  console.log(files);
  fileImport.value = files.raw;
};

const uploadLicense = () => {
  let formData = new FormData();
  const dataUpdateLicense = {
    cmd: {
      receiver: GatewayServiceId,
      payload: {
        cmdType: cmdTypes.uploadLicense,
      },
    },
    lic: fileImport.value,
  };
  for (const [key, value] of Object.entries(dataUpdateLicense)) {
    if (key === "cmd") {
      formData.append("cmd", JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  }
  baseApi
    .updateLicense(formData)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        openFullScreenLoading();
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
};

//set Info License success
const openFullScreenLoading = () => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  setTimeout(() => {
    loading.close();
  }, 2000);
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiLicense"
        title="License server activation"
        main
      >
        <el-tooltip
          class="box-item"
          effect="dark"
          content="License Info"
          placement="top-start"
        >
          <el-button
            type="info"
            :icon="InfoFilled"
            circle
            @click="getLicenseInfo"
          />
        </el-tooltip>
      </SectionTitleLineWithButton>
      <CardBox class="mb-4">
        <el-link type="primary" disabled>Machine Code</el-link>
        <el-input
          v-model="machineCode"
          class="w-50 m-2"
          size="large"
          disabled
          :prefix-icon="Cpu"
        />
      </CardBox>
      <CardBox>
        <el-link type="primary" disabled>Upload License</el-link>
        <el-upload
          ref="upload"
          class="upload-demo mt-2"
          drag
          :limit="1"
          :on-exceed="handleExceedUpload"
          :on-change="handChangeUpload"
          :auto-upload="false"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              License files with a size less than 500kb
            </div>
          </template>
        </el-upload>
        <div class="flex justify-center">
          <el-button type="success" @click="uploadLicense" size="large" round>
            Upload
          </el-button>
        </div>
      </CardBox>
    </SectionMain>
    <!-- // dialog  -->
    <el-dialog v-model="dialogVisible" title="License Information" width="30%">
      <div v-if="licenseInfo.length === 0">
        <p class="text-2xl bg-red-600 text-center text-white">NO LICENSE</p>
        <p class="m-4 text-blue-400">
          * Please contact ATS for getting the license.
        </p>
      </div>
      <el-scrollbar>
        <p v-for="item in licenseInfo" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p>
      </el-scrollbar>
    </el-dialog>
  </LayoutAuthenticated>
</template>
<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
