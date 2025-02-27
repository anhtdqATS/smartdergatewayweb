<template>
  <div class="flex gap-x-4 mb-[14px]">
    <BaseIcon
      :w="'w-10'"
      :h="'h-10'"
      :path="iconPath"
      :size="'500px'"
    ></BaseIcon>
    <div class="grid content-center w-28">
      <span>{{ label }}</span>
    </div>
    <div class="w-full grid content-center">
      <el-progress
        :text-inside="true"
        :stroke-width="20"
        :percentage="percentageValue"
        :status="color"
      >
      </el-progress>
    </div>
    <div class="grid content-center w-14">
      <span>{{ quantity }}</span>
    </div>
  </div>
</template>

<script setup>
import BaseIcon from "@/components/BaseIcon.vue";

const props = defineProps({
  iconPath: String,
  label: String,
  toltalQuantity: Number,
  onlineQuantity: Number,
  color: {
    default: "",
    type: String,
  },
});

const percentageValue = computed(() => {
  if (props.toltalQuantity === 0) {
    return 0;
  } else {
    return Math.floor((props.onlineQuantity / props.toltalQuantity) * 100);
  }
});
const quantity = computed(() => {
  return (
    props.onlineQuantity.toString() + "/" + props.toltalQuantity.toString()
  );
});
</script>
