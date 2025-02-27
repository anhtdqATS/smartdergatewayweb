<script setup>
import {
  mdiMeterElectricOutline,
  mdiPowerPlugOutline,
  mdiBatteryChargingMedium,
  mdiFridgeVariantAlertOutline,
} from "@mdi/js";
import customOnlineStatus from "./customOnlineStatus.vue";
import { useHomeStore } from "../store/homeStore";

const store = useHomeStore();
const items = computed(() => [
  {
    iconPath: mdiMeterElectricOutline,
    label: "Meters",
    toltalQuantity: store.onlineStatus.totalPM,
    onlineQuantity: store.onlineStatus.totalPMOnline,
  },
  {
    iconPath: mdiPowerPlugOutline,
    label: "IBRs",
    toltalQuantity: store.onlineStatus.totalIBR,
    onlineQuantity: store.onlineStatus.totalIBROnline,
    color: "success",
  },
  {
    iconPath: mdiBatteryChargingMedium,
    label: "ESSs",
    toltalQuantity: store.onlineStatus.totalESS,
    onlineQuantity: store.onlineStatus.totalESSOnline,
    color: "warning",
  },
  {
    iconPath: mdiFridgeVariantAlertOutline,
    label: "QComps",
    toltalQuantity: store.onlineStatus.totalQComp,
    onlineQuantity: store.onlineStatus.totalQCompOnline,
    color: "exception",
  },
  // Add more items as needed
]);
</script>
<template>
  <div class="h-full w-full flex justify-center items-center flex-col">
    <div class="w-full">
      <h3 class="mb-4 font-semibold">Online Status</h3>
    </div>
    <div class="w-full">
      <customOnlineStatus
        v-for="(item, index) in items"
        :key="index"
        :iconPath="item.iconPath"
        :label="item.label"
        :toltalQuantity="item.toltalQuantity"
        :onlineQuantity="item.onlineQuantity"
        :color="item.color"
      />
    </div>
  </div>
</template>
