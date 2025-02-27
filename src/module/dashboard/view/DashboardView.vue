<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";

import { mdiChartTimelineVariant, mdiConnection } from "@mdi/js";

const listItem = [
  { label: "", img: "/img/1_toan-canh-du-an-1.jpg" },
  { label: "", img: "/img/LN2.jpg" },
  { label: "", img: "/img/SPP.jpg" },
];
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Overview"
        main
      >
        <BaseButton
          href="https://ats.com.vn/"
          target="_blank"
          :icon="mdiConnection"
          label="Connect ATS"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <CardBox>
        <el-carousel :interval="10000" type="card">
          <el-carousel-item v-for="item in listItem" :key="item">
            <img :src="item.img" style="width: 100%; height: 100%" />
            <h3 text="2xl" justify="center">{{ item.label }}</h3>
          </el-carousel-item>
        </el-carousel>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
