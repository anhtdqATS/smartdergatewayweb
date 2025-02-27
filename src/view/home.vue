<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import LoadingContainer from "@/components/Loading.vue";
import { useHomeStore } from "./store/homeStore";

import BaseButton from "@/components/BaseButton.vue";
import topWidget from "./home/topWidget.vue";
import PoiMea from "./home/PoiMea.vue";
import POIchart from "../module/gatewaychannel/channel/smartPCC_Channel/view/controllerTools/components/POIchart.vue";
import ControlMode from "./home/ControlMode.vue";
import AlarmStatus from "./home/AlarmStatus.vue";
import OnlineStatus from "./home/OnlineStatus.vue";
import logTable from "./home/logTable.vue";
import baseGatewayChannel from "@/Base/composable/gatewayChannel.js";

import weatherWidget from "./home/weatherWidget.vue";
import { mdiConnection, mdiChartTimelineVariant } from "@mdi/js";
import { computed, onMounted, onUnmounted } from "vue";
const { getChannels } = baseGatewayChannel();

const listItem = [
  { label: "", img: "/img/1_toan-canh-du-an-1.jpg" },
  { label: "", img: "/img/LN2.jpg" },
  { label: "", img: "/img/SPP.jpg" },
];
const homeStore = useHomeStore();

const listTypeChannel = ref([]);
const initData = async () => {
  await homeStore.getDashboardChannel();
  listTypeChannel.value = await getChannels();
};
initData();

const channelActive = computed(() => {
  const result = listTypeChannel.value.filter(
    (channel) => channel.objectId === homeStore.ObjectID
  );
  if (result[0]) {
    return result[0].name;
  } else {
    return "";
  }
});

const isInterval = ref(null);
onMounted(() => {
  isInterval.value = setInterval(() => {
    homeStore.getData();
  }, 3000);
});
onUnmounted(() => {
  clearInterval(isInterval.value);
});
</script>
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
          <BaseButton
            href="javascript:void(0)"
            :icon="mdiConnection"
            :label="channelActive"
            color="contrast"
            rounded-full
            small
          />
        </el-tooltip>
      </SectionTitleLineWithButton>
      <div v-show="homeStore.isLoadingContainer">
        <LoadingContainer></LoadingContainer>
      </div>
      <div v-show="homeStore.isLoadingContainer === false">
        <div class="grid-container" v-if="homeStore.loadDashboard">
          <div class="block1">
            <topWidget></topWidget>
          </div>
          <div class="block2">
            <CardBox class="h-full">
              <PoiMea :channelId="homeStore.ObjectID"></PoiMea>
            </CardBox>
          </div>
          <div class="block3">
            <CardBox class="h-full">
              <ControlMode></ControlMode>
            </CardBox>
          </div>
          <div class="block4">
            <CardBox class="h-full">
              <AlarmStatus></AlarmStatus>
            </CardBox>
          </div>
          <div class="block5">
            <CardBox class="h-full"
              ><POIchart
                :channelId="homeStore.ObjectID"
                :POI="homeStore.POI"
              ></POIchart>
            </CardBox>
          </div>
          <div class="block6">
            <weatherWidget></weatherWidget>
          </div>
          <div class="block7">
            <CardBox class="h-full">
              <OnlineStatus></OnlineStatus>
            </CardBox>
          </div>
          <div class="block8">
            <CardBox>
              <logTable></logTable>
            </CardBox>
          </div>
        </div>
        <div v-else>
          <CardBox>
            <el-carousel :interval="10000" type="card">
              <el-carousel-item v-for="item in listItem" :key="item">
                <img :src="item.img" style="width: 100%; height: 100%" />
                <h3 text="2xl" justify="center">{{ item.label }}</h3>
              </el-carousel-item>
            </el-carousel>
          </CardBox>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;
  /* grid-template-rows: subgrid; */
  /* justify-content: space-evenly; */
  /* padding: 10px; */
}

@media only screen and (max-width: 768px) {
  .block1 {
    grid-column: 1/8;
  }
  .block2 {
    grid-column: 1/8;
  }
  .block3 {
    grid-column: 1/8;
  }
  .block4 {
    grid-column: 1/8;
  }
  .block5 {
    grid-column: 1/8;
  }
  .block6 {
    grid-column: 1/8;
  }
  .block7 {
    grid-column: 1/8;
  }
  .block8 {
    grid-column: 1/8;
  }
}

@media only screen and (max-width: 1536px) and (min-width: 768px) {
  .block1 {
    grid-column: 1/8;
  }
  .block2 {
    grid-column: 1/5;
    grid-row: 2 / span 1;
  }
  .block3 {
    grid-column: 1 / span 2;
    grid-row: 3 / span 1;
  }
  .block4 {
    grid-column: 1 / span 2;
    grid-row: 4 / span 1;
  }
  .block5 {
    grid-column: 3/8;
    grid-row: 3 / span 2;
  }
  .block6 {
    grid-column: 1/8;
    grid-row: 6 / span 1;
  }
  .block7 {
    grid-column: 5/8;
    grid-row: 2 / span 1;
  }
  .block8 {
    grid-column: 1/8;
  }
}

@media only screen and (min-width: 1538px) {
  .block1 {
    grid-column: 1/8;
  }
  .block2 {
    grid-column: 1/4;
  }
  .block3 {
    grid-column: 1 / span 2;
  }
  .block4 {
    grid-column: 3 / span 1;
    height: 100%;
  }
  .block5 {
    grid-column: 4/8;
    grid-row: 2 / span 2;
  }
  .block6 {
    grid-column: 1/6;
  }
  .block7 {
    grid-column: 6/8;
  }
  .block8 {
    grid-column: 1/8;
  }
}
</style>
