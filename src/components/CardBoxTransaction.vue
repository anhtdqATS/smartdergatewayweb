<script setup>
import { computed } from "vue";
import {
  mdiSunAngleOutline,
  mdiWeatherSunny,
  mdiCloudPercentOutline,
  mdiCreditCardOutline,
} from "@mdi/js";
import CardBox from "@/components/CardBox.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import PillTag from "@/components/PillTag.vue";
import IconRounded from "@/components/IconRounded.vue";

const props = defineProps({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  measure: {
    type: String,
    default: "W/m2",
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "W/m2",
  },
  size: {
    type: String,
    default: "24",
  },
  h: {
    type: String,
    default: "h-12",
  },
  w: {
    type: String,
    default: "w-12",
  },
});
</script>

<template>
  <CardBox class="last:mb-0 w-full flex">
    <BaseLevel class="h-full">
      <!-- <BaseLevel type="justify-start items-center h-full"> -->
      <IconRounded
        :icon="icon"
        :color="color"
        :size="size"
        :h="h"
        :w="w"
        class=""
      />
      <div class="text-center space-y-1 md:text-left">
        <h4 class="text-xl">
          <b> {{ amount }} </b> {{ measure }}
        </h4>
        <p class="text-gray-500 dark:text-slate-400">
          {{ name }}
        </p>
      </div>
      <!-- </BaseLevel> -->
      <!-- <div class="text-center md:text-right space-y-2">
        <p class="text-sm text-gray-500">
          {{ name }}
        </p>
        <div>
          <PillTag :color="icon.type" :label="type" small />
        </div>
      </div> -->
    </BaseLevel>
  </CardBox>
</template>
