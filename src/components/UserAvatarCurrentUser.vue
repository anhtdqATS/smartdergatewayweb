<script setup>
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();
</script>

<template>
  <div>
    <slot />
  </div>
</template>
