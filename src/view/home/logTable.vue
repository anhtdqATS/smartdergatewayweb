<script lang="jsx" setup>
import convertTimestamp from "@/Base/convertTimestamp.js";
import { ref } from "vue";
import { useHomeStore } from "../store/homeStore";
import { RefreshRight } from "@element-plus/icons-vue";
const columns = ref([
  {
    key: "column-n-1",
    width: "5%",
    title: "#",
    align: "center",
    cellRenderer: ({ rowIndex }) => `${rowIndex + 1}`,
  },
  {
    key: "TimeStamp",
    title: "Timestamp",
    dataKey: "TimeStamp",
    width: "40%",
    align: "center",
    cellRenderer: ({ cellData: TimeStamp }) => (
      <span>{convertTimestamp.convertDateTimeToString(TimeStamp)}</span>
    ),
  },
  {
    key: "Source",
    title: "Source",
    dataKey: "Source",
    width: "15%",
    sortable: true,
    align: "left",
  },
  {
    key: "PointName",
    title: "Point Name",
    dataKey: "PointName",
    width: "15%",
    align: "left",
    cellRenderer: ({ cellData: PointName }) => <ElTag round>{PointName}</ElTag>,
  },
  {
    key: "Value",
    title: "Value",
    dataKey: "Value",
    width: "25%",
    align: "center",
  },
]);

const store = useHomeStore();
const resetLogsData = () => {
  store.resetLogs();
};
</script>

<template>
  <div class="flex justify-between">
    <h3 class="font-semibold">PPC Logs</h3>
    <el-button :icon="RefreshRight" @click="resetLogsData()" />
  </div>
  <div class="h-[300px]">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="columns"
          :data="store.Logs"
          :width="width"
          :height="height"
        >
        </el-table-v2>
      </template>
    </el-auto-resizer>
  </div>
</template>
