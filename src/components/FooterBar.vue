<script setup>
import { containerMaxW } from "@/config.js";
import BaseLevel from "@/components/BaseLevel.vue";
// import JustboilLogo from "@/components/JustboilLogo.vue";

const year = new Date().getFullYear();
</script>

<template>
  <footer class="py-2 px-6" :class="containerMaxW">
    <BaseLevel>
      <div class="text-center md:text-left">
        <b
          >&copy;{{ year }},
          <a href="https://ats.com.vn/" target="_blank">ats.com.vn</a>.</b
        >
        <slot />
      </div>
      <div class="md:py-2">
        <a href="https://ats.com.vn">
          <!-- <JustboilLogo class="w-auto h-8 md:h-6" /> -->
          <img
            src="/img/ATS-logo-transparent.ico"
            alt=""
            class="h-12 w-12 rounded-full"
          />
        </a>
      </div>
    </BaseLevel>
  </footer>
</template>
