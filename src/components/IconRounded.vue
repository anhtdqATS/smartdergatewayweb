<script setup>
import { colorsText, colorsBgLight } from "@/colors.js";
import BaseIcon from "@/components/BaseIcon.vue";

defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: null,
  },
  w: {
    type: String,
    default: "w-12",
  },
  h: {
    type: String,
    default: "h-12",
  },
  size: {
    type: String,
    default: "24",
  },
  bg: Boolean,
});
</script>

<template>
  <BaseIcon
    :path="icon"
    :w="w"
    :h="h"
    :size="size"
    class="rounded-full"
    :class="
      bg
        ? colorsBgLight[color]
        : [colorsText[color], 'bg-gray-50 dark:bg-slate-800']
    "
  />
</template>
