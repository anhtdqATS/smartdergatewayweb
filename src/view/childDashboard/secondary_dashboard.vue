<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Overview"
        main
      >
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Channel Active"
          placement="left-start"
        >
          <div class="flex">
            <el-button-group class="ml-4">
              <el-button
                :type="isChanged ? 'success' : 'secondary'"
                @click="callSave"
                :icon="Upload"
                size="small"
              />
              <el-button
                type="warning"
                @click="callLoad"
                :icon="RefreshRight"
                size="small"
              />
              <el-button
                v-if="canEdit"
                @click="callEdit"
                :icon="Edit"
                size="small"
              />
              <el-button
                v-else
                @click="callEdit"
                :icon="VideoPlay"
                size="small"
              />
            </el-button-group>
            <!-- <div class="flex">
              <el-button
                :type="isChanged ? 'success' : 'secondary'"
                @click="callSave"
                :icon="Edit"
              />
              <el-button type="warning" @click="callEdit" :icon="Edit" />
              <el-button v-if="canEdit" @click="callSave" :icon="Edit" />
              <el-button v-else @click="callEdit" :icon="Edit" />
            </div> -->
            <div
              class="color-swatch flex justify-around"
              :style="{ overflowX: 'auto', scrollSnapType: 'x' }"
            >
              <div
                v-for="(item, index) in componentList"
                :key="index"
                :id="item"
                class="color-swatch__color m-50"
                :style="{
                  textAlign: 'center',
                  height: 'auto',
                  width: '50px',
                  backgroundColor: 'hsl(' + (index - 1) * 30 + ', 80%, 73%)',
                }"
                @dragstart="handleDragstart"
                draggable="true"
              >
                <div class="mt-50">
                  <i v-if="item == 'MAP'" class="pi pi-fw pi-map-marker"></i>
                  <div
                    v-if="item == 'LINE'"
                    :style="{
                      height: '19.5px',
                      borderBottom: 'solid 3px Gray',
                      marginLeft: '8px',
                      marginRight: '8px',
                    }"
                  ></div>
                  <i v-if="item == 'Top'" class="pi pi-fw pi-chart-line"></i>
                  <i v-if="item == 'PoiMea'" class="pi pi-fw pi-chart-line"></i>
                  <i
                    v-if="item == 'ControlMode'"
                    class="pi pi-fw pi-chart-bar"
                  ></i>
                  <i
                    v-if="item == 'AlarmStatus'"
                    class="pi pi-fw pi-chart-bar"
                  ></i>
                  <i
                    v-if="item == 'OnlineStatus'"
                    class="pi pi-fw pi-chart-line"
                  ></i>
                  <i
                    v-if="item == 'logTable'"
                    class="pi pi-fw pi-chart-line"
                  ></i>
                </div>
                <div class="mb-50" :style="{ fontSize: '10px' }">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
          <BaseButton
            href="javascript:void(0)"
            :icon="mdiConnection"
            :label="abc"
            color="contrast"
            rounded-full
            small
          />
        </el-tooltip>
      </SectionTitleLineWithButton>

      <div class="h-full">
        <div class="col-115 application-left-side-main h-full">
          <div :class="internalPdfMode ? 'containerView' : 'containerEdit'">
            <dashboardFrame
              :data="activeDashboardData"
              :component-getter="getComponent"
              :editing="canEdit"
              :pdfMode="internalPdfMode"
              ref="dashboard"
              @change="dirkChange"
            ></dashboardFrame>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import LoadingContainer from "@/components/Loading.vue";
import { mdiConnection, mdiChartTimelineVariant } from "@mdi/js";
import { Upload, RefreshRight, VideoPlay, Edit } from "@element-plus/icons-vue";
import { ref, onBeforeUnmount, onMounted } from "vue";
import dashboardFrame from "./components/dashboardFrame.vue";
import dashboardHelper from "../store/dashboardHelper";

const props = defineProps({
  pdfMode: {
    type: Boolean,
    default: false,
  },
});
const componentList = [
  "Top",
  "PoiMea",
  "ControlMode",
  "AlarmStatus",
  "OnlineStatus",
  "logTable",
];
const canEdit = ref(true);
const internalPdfMode = ref(props.pdfMode);
const tempDashboardData = ref({});
let activeDashboardData = ref(dashboardHelper.defaultSetting);
const isChanged = ref(false);

const getComponent = (name) => {
  return dashboardHelper.getComponent(name);
};

const handleDragstart = (e) => {
  dashboardHelper.handleDragstart(e);
};

const dirkChange = () => {
  dashboardHelper.dirkChange(activeDashboardData.value);
  isChanged.value = true;
};

const callSave = () => {
  console.log(activeDashboardData);
  saveConfigReport();
};

const callLoad = () => {
  setTempDashboardData({ data: dashboardHelper.defaultSetting });
  activeDashboardData.value = tempDashboardData.value.data;
  // activeDashboardData.value = dashboardHelper.defaultSetting; // Object.assign({}, tempDashboardData.value.data);
};

const callEdit = () => {
  canEdit.value = !canEdit.value;
};

const saveConfigReport = () => {
  setTempDashboardData({ data: activeDashboardData.value });
  dashboardHelper.saveSettingLocalStorage(tempDashboardData);
  isChanged.value = false;
};
onMounted(() => {
  let saveLayoutDashboard = null; // dashboardHelper.loadSettingLocalStorage();
  console.log("saveLayoutDashboard");
  console.log(saveLayoutDashboard);
  if (
    saveLayoutDashboard == null ||
    saveLayoutDashboard == "undefined" ||
    saveLayoutDashboard.data == "undefined"
  )
    setTempDashboardData({ data: dashboardHelper.defaultSetting });
  else setTempDashboardData(saveLayoutDashboard);

  activeDashboardData.value = tempDashboardData.value.data;
});
onBeforeUnmount(() => {
  if (isChanged.value) {
    saveConfigReport();
  }
});

const setTempDashboardData = (pData) => {
  console.log("setTempDashboardData");
  tempDashboardData.value = pData;
};
</script>

<style>
.application-left-side-main {
  /* float: left; */
  /* width: calc((100vw - 8rem)); */
  width: 100%;
}
.application-right-side-custom {
  /* float: right; */
  display: flex;

  width: 4rem !important;
  position: relative;
  border: 1px solid #f0f1f2;
  height: auto;
}
.containerEdit {
  margin: 0px auto;
  border: 1px solid #f0f1f2;
  height: 100%;
  background-color: #f0f1f2;
}
.containerEdit .dashboard__block--panel {
  margin: 5px;
}
.containerView {
  margin: 20px auto;
  border: 1px solid #f0f1f2;
  height: auto;
  background-color: #fff;
}
.containerView .dashboard__block--panel {
  margin: 1px;
}
.container {
  margin: 20px auto;
  border: 1px solid #f0f1f2;
  height: auto;
}
.color-swatch__color {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: 5px;
  cursor: move;
}
.dashboard__block__component {
  background-color: #fff;
}
.ql-container {
  border-bottom: none !important;
}
.ql-toolbar {
  border-bottom: none !important;
}
</style>
