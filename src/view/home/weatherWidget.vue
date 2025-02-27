<script setup>
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import {
  mdiWeatherWindyVariant,
  mdiAirConditioner,
  mdiSunAngleOutline,
  mdiCloudPercentOutline,
  mdiThermometer,
  mdiThermometerLines,
  mdiWeatherSunny,
  mdiWeatherWindy,
} from "@mdi/js";
import { computed, onMounted, onUnmounted } from "vue";
import { useHomeStore } from "../store/homeStore";
const store = useHomeStore();

const transactionBarItems = computed(() => [
  {
    amount: store.weathers.TitledIrradiance,
    account: "45721474",
    name: "Tilted Irradiance",
    date: "3 days ago",
    measure: "W/m2",
    icon: mdiSunAngleOutline,
    color: "amber",
  },
  {
    amount: store.weathers.HorizonalIrradiance,
    account: "94486537",
    name: "Horizonal Irradiance",
    date: "3 days ago",
    measure: "W/m2",
    icon: mdiWeatherSunny,
    color: "warning",
  },
  {
    amount: store.weathers.Humidity,
    account: "63189893",
    name: "Humidity",
    date: "5 days ago",
    measure: "%",
    icon: mdiCloudPercentOutline,
    color: "success",
  },
  {
    amount: store.weathers.AmbientTemp,
    account: "74828780",
    name: "Ambient Temp",
    date: "7 days ago",
    measure: "oC",
    icon: mdiThermometer,
    color: "danger",
  },
  {
    amount: store.weathers.ObjectTemp,
    account: "74828780",
    name: "PV Temp",
    date: "7 days ago",

    measure: "oC",
    icon: mdiThermometerLines,
    color: "pink",
  },

  {
    amount: store.weathers.AirPressure,
    account: "74828780",
    name: "Air Pressure",
    date: "7 days ago",
    measure: "mbar",
    icon: mdiAirConditioner,
    color: "teal",
  },
  {
    amount: store.weathers.WindSpeed,
    account: "74828780",
    name: "Wind Speed",
    date: "7 days ago",
    measure: "m/s",
    icon: mdiWeatherWindy,
    color: "sky",
  },
  {
    amount: store.weathers.WindDirection,
    account: "74828780",
    name: "Wind Direction",
    date: "7 days ago",
    measure: "o",
    icon: mdiWeatherWindyVariant,
    color: "info",
  },
]);
</script>

<template>
  <div class="grid grid-cols-4 gap-4 h-full h-">
    <CardBoxTransaction
      v-for="(transaction, index) in transactionBarItems"
      :key="index"
      :amount="transaction.amount"
      :date="transaction.date"
      :business="transaction.business"
      :type="transaction.type"
      :name="transaction.name"
      :account="transaction.account"
      :measure="transaction.measure"
      :icon="transaction.icon"
      :color="transaction.color"
      size="30"
      h="h-16"
      w="w-16"
      class="flex-1"
    />
  </div>
</template>
