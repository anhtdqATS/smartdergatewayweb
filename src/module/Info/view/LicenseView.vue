<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import { genFileId } from "element-plus";

import { GatewayServiceId } from "@/Constants/index.js";
import cmdTypes from "../cmdTypes";

import { mdiLicense } from "@mdi/js";
import { Cpu, UploadFilled, InfoFilled } from "@element-plus/icons-vue";
import baseApi from "../api/baseApi";
import { useMainStore } from "@/stores/main.js";
// useMainStore().getLicenseInfo();
const machineCode = ref();
const licenseInfo1 = ref([]);
const licenseInfo2 = ref([]);
const licenseInfo3 = ref([]);
const loadLicense = ref(false);
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
          message: res.data.error,
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        machineCode.value = res.data.payload.machineCode.join(",");
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

const getLicenseInfo = async () => {
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
          message: res.data.error,
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        let licenseInfo = res.data.payload.licInfo;
        loadLicense.value = true;
        let length = licenseInfo.length;
        let partSize = Math.ceil(length / 3);

        licenseInfo1.value = licenseInfo.slice(0, partSize);
        licenseInfo2.value = licenseInfo.slice(partSize, partSize * 2);
        licenseInfo3.value = licenseInfo.slice(partSize * 2);
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
getLicenseInfo();
// upload License
const fileImport = ref();
const upload = ref();
const handleExceedUpload = (files) => {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
};
const handChangeUpload = (files) => {
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
          message: res.data.error,
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        openFullScreenLoading();
        getLicenseInfo();
        ElMessage({
          message: "Successfully updated !",
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
const loading = ref(true);
</script>

<template>
  <div>
    <LayoutAuthenticated>
      <SectionMain>
        <SectionTitleLineWithButton
          :icon="mdiLicense"
          title="License server activation"
          main
        >
          <!-- <el-tooltip
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
        </el-tooltip> -->
        </SectionTitleLineWithButton>
        <CardBox class="mb-4">
          <el-link type="primary" class="mb-4" disabled>Machine Code</el-link>
          <el-descriptions :column="1" border>
            <el-descriptions-item align="center">
              <template #label>
                <div class="cell-item">
                  <el-icon>
                    <Cpu />
                  </el-icon>
                </div>
              </template>
              {{ machineCode }}
            </el-descriptions-item>
          </el-descriptions>
          <!-- <el-input
          v-model="machineCode"
          class="w-50 m-2 !cursor-auto"
          size="large"
          :prefix-icon="Cpu"
        /> -->
        </CardBox>
        <CardBox class="mb-4">
          <el-link type="primary" class="mb-4" disabled>License Info</el-link>
          <div v-if="loadLicense">
            <div v-if="licenseInfo1.length === 0">
              <p class="text-2xl bg-red-600 text-center text-white">
                NO LICENSE
              </p>
              <p class="m-4 text-blue-400">
                * Please contact ATS for getting the license.
              </p>
            </div>
            <div class="grid grid-cols-3 gap-x-2">
              <el-scrollbar>
                <p
                  v-for="item in licenseInfo1"
                  :key="item"
                  class="scrollbar-demo-item"
                >
                  {{ item }}
                </p>
              </el-scrollbar>
              <el-scrollbar>
                <p
                  v-for="item in licenseInfo2"
                  :key="item"
                  class="scrollbar-demo-item"
                >
                  {{ item }}
                </p>
              </el-scrollbar>
              <el-scrollbar>
                <p
                  v-for="item in licenseInfo3"
                  :key="item"
                  class="scrollbar-demo-item"
                >
                  {{ item }}
                </p>
              </el-scrollbar>
            </div>
          </div>
          <div v-else>
            <el-table v-loading="loading" style="width: 100%"> </el-table>
          </div>
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
    </LayoutAuthenticated>
  </div>
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
  /* color: gainsboro */
}
.el-input.is-disabled .el-input__inner {
  cursor: pointer;
}
</style>
