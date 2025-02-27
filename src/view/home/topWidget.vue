<script setup>
import { useHomeStore } from "../store/homeStore";

import {
  mdiFilePowerpointBox,
  mdiGeneratorStationary,
  mdiSineWave,
  mdiTuneVertical,
} from "@mdi/js";
import { computed, watch } from "vue";
const store = useHomeStore();

// let PlantRatingOld = store.PlantInfo.Pnom;
// let FrequencyOld = store.POI.PM_F;
// let P_SetPointOld = store.PlantInfo.P_Setpoint_fb;

const PlantRating = computed(() => {
  return store.roundFloatNumber(store.PlantInfo.Pnom);
});
const Frequency = computed(() => {
  return store.roundFloatNumber(store.POI.PM_F);
});
const P_SetPoint = computed(() => {
  return store.roundFloatNumber(store.PlantInfo.P_Setpoint_fb);
});
const lastSetpoint = computed(() => {
  switch (store.controlMode.Q_Mode_fb) {
    case 1 || 4:
      return {
        label: "Q Setpoint",
        value: store.roundFloatNumber(store.PlantInfo.Q_Setpoint_fb),
        suffix: " kVAr",
      };
    case 2 || 5:
      return {
        label: "V Setpoint",
        value: store.roundFloatNumber(store.PlantInfo.V_Setpoint_fb),
        suffix: " kVAr",
      };
    case 3:
      return {
        label: "PF Setpoint",
        value: store.roundFloatNumber(store.PlantInfo.PF_Setpoint_fb),
        suffix: "",
      };

    default:
      return {
        label: "Q/PF/V Setpoint",
        value: 0,
        suffix: "",
      };
  }
});

const trenPlanRating = ref({
  trend: "loading",
  trend_type: "down",
});
</script>

<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    <CardBoxWidget
      color="text-blue-500"
      :icon="mdiGeneratorStationary"
      :number="PlantRating"
      suffix=" kW"
      label="Plant Rating"
      class="plantRatting"
    />

    <CardBoxWidget
      color=" text-red-500"
      :icon="mdiSineWave"
      :number="Frequency"
      suffix=" Hz"
      label="Frequency"
    />
    <CardBoxWidget
      color="text-emerald-500"
      :icon="mdiFilePowerpointBox"
      :number="P_SetPoint"
      suffix=" kW"
      label="P Setpoint"
    />
    <CardBoxWidget
      color="text-violet-500"
      :icon="mdiTuneVertical"
      :number="lastSetpoint.value"
      :suffix="lastSetpoint.suffix"
      :label="lastSetpoint.label"
    />
  </div>
</template>
<style scoped>
.plantRatting {
  background: #00d2ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #928dab,
    #00d2ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #928dab,
    #00d2ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
