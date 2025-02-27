<script setup>
import { containerMaxW } from "@/config.js";
</script>

<template>
  <section class="px-6 py-2" :class="containerMaxW">
    <slot />
  </section>
</template>
