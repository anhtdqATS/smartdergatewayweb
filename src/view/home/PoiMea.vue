<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import { useClockMeaStore } from "../store/poiMea";
import ChartModuleMore from "highcharts/highcharts-more.js";
// import HCSoldGauge from "highcharts/modules/solid-gauge";
import { useHomeStore } from "../store/homeStore";

ChartModuleMore(Highcharts);
// HCSoldGauge(Highcharts);
export default {
  components: {
    highcharts: Chart,
  },
  setup() {
    const homeStore = useHomeStore();

    const poiChartStore = useClockMeaStore();
    // Bring life to the dials

    const reactivePowerData = computed(() => {
      return homeStore.roundFloatNumber(homeStore.POI.PM_Q);
    });
    const activePowerData = computed(() => {
      return homeStore.roundFloatNumber(homeStore.POI.PM_P);
    });

    const volgateData = computed(() => {
      return homeStore.roundFloatNumber(homeStore.POI.PM_V);
    });

    return { poiChartStore, reactivePowerData, volgateData, activePowerData };
  },
};
</script>

<template>
  <div class="grid grid-cols-3 h-full w-full justify-center items-center">
    <div class="h-full w-full">
      <highcharts
        :options="poiChartStore.reactivePowerOptions"
        ref="chart"
      ></highcharts>
      <div class="text-center">
        <span class="text-blue-500 dark:text-lime-500 text-[26px] font-bold">{{
          reactivePowerData
        }}</span
        ><span
          style="opacity: 0.6"
          class="dark:text-[#f1f5f9] text-[16px] font-semibold"
        >
          kVAr</span
        >
      </div>
    </div>
    <div class="h-full w-full">
      <highcharts
        :options="poiChartStore.activePowerOptions"
        ref="chart"
      ></highcharts>
      <div class="text-center">
        <span class="text-blue-500 dark:text-lime-500 text-[30px] font-bold">{{
          activePowerData
        }}</span
        ><span
          style="opacity: 0.6"
          class="dark:text-[#f1f5f9] text-[18px] font-semibold"
        >
          kW</span
        >
      </div>
    </div>
    <div class="h-full w-full">
      <highcharts
        :options="poiChartStore.voltageOptions"
        ref="chart"
      ></highcharts>
      <div class="text-center">
        <span class="text-blue-500 dark:text-lime-500 text-[26px] font-bold">{{
          volgateData
        }}</span
        ><span
          style="opacity: 0.6"
          class="dark:text-[#f1f5f9] text-[16px] font-semibold"
        >
          kV</span
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.highlight {
  background-color: red;
  stroke-width: 2px;
  stroke: black;
}
</style>
