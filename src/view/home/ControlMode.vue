<script setup>
import { useHomeStore } from "../store/homeStore";

const store = useHomeStore();

const PModeStatus = computed(() => {
  if (store.controlMode.P_Mode_fb === 1) {
    return {
      status: "bg-[#55bf3b]",
      value: "Open Loop",
    };
  }
  if (store.controlMode.P_Mode_fb === 2) {
    return {
      status: "bg-[#55bf3b]",
      value: "Close Loop",
    };
  } else {
    return {
      status: "bg-[#ef4444]",
      value: "Disable",
    };
  }
});
const QModeStatus = computed(() => {
  switch (store.controlMode.Q_Mode_fb) {
    case 1:
      return {
        status: "bg-[#55bf3b]",
        value: "Q control",
      };
    case 2:
      return {
        status: "bg-[#55bf3b]",
        value: "V Slope control",
      };
    case 3:
      return {
        status: "bg-[#55bf3b]",
        value: "PF control",
      };
    case 4:
      return {
        status: "bg-[#55bf3b]",
        value: "Open Loop",
      };
    case 5:
      return {
        status: "bg-[#55bf3b]",
        value: "V control",
      };

    default:
      return {
        status: "bg-[#ef4444]",
        value: "Disable",
      };
  }
});
const PFModeStatus = computed(() => {
  if (store.controlMode.P_Freq_Enable_fb) {
    return {
      status: "bg-[#55bf3b]",
      value: "Enabled",
    };
  } else {
    return {
      status: "bg-[#ef4444]",
      value: "Disable",
    };
  }
});
</script>
<template>
  <div class="grid gap-4">
    <h3 class="mb-1 font-semibold">Control Mode</h3>
    <div class="grid grid-cols-2">
      <span>P Mode</span>
      <a
        href="javascript:void(0)"
        :class="PModeStatus.status"
        class="cursor-default rounded-2xl h-[32px] w-full flex justify-center items-center text-white text-sm font-semibold"
        >{{ PModeStatus.value }}
      </a>
    </div>
    <div class="grid grid-cols-2">
      <span>P/f Mode</span>
      <a
        href="javascript:void(0)"
        :class="PFModeStatus.status"
        class="cursor-default rounded-2xl h-[32px] w-full flex justify-center items-center text-white text-sm font-semibold"
        >{{ PFModeStatus.value }}
      </a>
    </div>
    <div class="grid grid-cols-2">
      <span>Q Mode</span>
      <a
        href="javascript:void(0)"
        :class="QModeStatus.status"
        class="cursor-default rounded-2xl h-[32px] w-full flex justify-center items-center text-white text-sm font-semibold"
        >{{ QModeStatus.value }}
      </a>
    </div>
  </div>
</template>
