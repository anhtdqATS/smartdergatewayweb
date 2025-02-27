<script setup>
import { containerMaxW } from "@/config.js";
import BaseLevel from "@/components/BaseLevel.vue";
import { useStyleStore } from "@/stores/style";

const styleStore = useStyleStore();
const year = new Date().getFullYear();
</script>

<template>
  <footer
    :class="[
      containerMaxW,
      styleStore.textStyle ? styleStore.textStyle : 'text-gray-500',
    ]"
    class="py-2 px-6"
  >
    <BaseLevel>
      <div class="text-center md:text-left">
        <b>
          <a
            href="https://ats.com.vn"
            target="_blank"
            :class="
              styleStore.textStyle
                ? styleStore.textStyle
                : 'text-blue-600 text-[15px]'
            "
          >
            Copyright © ATS.jsc - All Rights Reserved
          </a>
        </b>
      </div>

      <ul class="grid grid-cols-1 gap-4">
        <a href="javascript:void(0)" class="cursor-default">
          <img
            src="/public/img/ATS-logo-transparent.ico"
            alt=""
            class="object-cover h-[30px] w-[30px]"
          />
        </a>
      </ul>
    </BaseLevel>
  </footer>
</template>
