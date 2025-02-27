<script setup>
import { useHomeStore } from "../store/homeStore";

const store = useHomeStore();
const AlarmStatus = computed(() => store.almarmStatus);
</script>

<template>
  <div class="grid gap-2">
    <h3 class="mb-1 font-semibold">Alarm Status</h3>
    <div class="flex justify-between">
      <span class="text-[14px]">LVRT</span>
      <a
        href="javascript:void(0)"
        :class="
          AlarmStatus.PM_LVRTDetectionStatus ? 'bg-[#ef4444]' : 'bg-[#55bf3b]'
        "
        class="cursor-default rounded-full h-6 w-6 inline-flex items-center"
      >
      </a>
    </div>
    <div class="flex justify-between">
      <span class="text-[14px]">HVRT</span>
      <a
        href="javascript:void(0)"
        :class="
          AlarmStatus.PM_HVRTDetectionStatus ? 'bg-[#ef4444]' : 'bg-[#55bf3b]'
        "
        class="cursor-default rounded-full h-6 w-6 inline-flex items-center"
      >
      </a>
    </div>
    <div class="flex justify-between">
      <span class="text-[14px]">Over Frequency</span>
      <a
        href="javascript:void(0)"
        :class="
          AlarmStatus.P_Freq_OverDetection ? 'bg-[#ef4444]' : 'bg-[#55bf3b]'
        "
        class="cursor-default rounded-full h-6 w-6 inline-flex items-center"
      >
      </a>
    </div>
    <div class="flex justify-between">
      <span class="text-[14px]">Under Frequency</span>
      <a
        href="javascript:void(0)"
        :class="
          AlarmStatus.P_Freq_UnderDetection ? 'bg-[#ef4444]' : 'bg-[#55bf3b]'
        "
        class="cursor-default rounded-full h-6 w-6 inline-flex items-center"
      >
      </a>
    </div>
    <div class="flex justify-between">
      <span class="text-[14px]">Meter</span>
      <a
        href="javascript:void(0)"
        :class="AlarmStatus.PM_Valid ? 'bg-[#55bf3b]' : 'bg-[#ef4444]'"
        class="rounded-full h-6 w-6 inline-flex items-center cursor-default"
      >
      </a>
      <!-- <el-button
        disabled
        :type="AlarmStatus.PM_Valid ? 'success' : 'danger'"
        circle
        size="small"
      ></el-button> -->
    </div>
  </div>
</template>
