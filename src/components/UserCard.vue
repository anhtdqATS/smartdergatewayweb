<script setup>
import { computed, ref } from "vue";
import { mdiCheckDecagram } from "@mdi/js";
import BaseLevel from "@/components/BaseLevel.vue";
import CardBox from "@/components/CardBox.vue";
import PillTag from "@/components/PillTag.vue";
import { useMainStore } from "@/stores/main.js";

const mainStore = useMainStore();
</script>

<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-center">
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <h1 class="text-2xl">
          Hallo, <b>{{ mainStore.userName }}</b
          >!
        </h1>
        <p>
          Last login <b> {{ mainStore.time }}</b>
        </p>
        <div class="flex justify-center md:block">
          <PillTag label="Verified" color="info" :icon="mdiCheckDecagram" />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
