<template>
  <div class="flex justify-end items-center gap-3">
    <div>
      <p class="text-xs text-red-400">*Set time query data (minute)</p>
      <el-input
        v-model.number="timeActive"
        size="small"
        class="md:!w-[50%] m-2"
        placeholder="Set range time"
      ></el-input>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="Submit"
        placement="top-start"
      >
        <el-button
          type="primary"
          size="small"
          :icon="Timer"
          @click="setRangeTime"
          round
        ></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { Timer } from "@element-plus/icons-vue";
// import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["setRangeTime"]);

const props = defineProps({
  timeRangeActive: {
    type: Number,
    default: 5,
  },
});

const timeActive = ref(props.timeRangeActive);

const setRangeTime = () => {
  emit("setRangeTime", timeActive.value);
};
</script>
