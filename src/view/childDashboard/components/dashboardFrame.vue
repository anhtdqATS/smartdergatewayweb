<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import dashboardBlock from "./dashboardBlock.vue";

const emit = defineEmits(["inFocus", "submit"]);
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: {},
  },
  componentGetter: {
    type: Function,
    required: true,
  },
  editing: {
    type: Boolean,
    default: false,
  },
  pdfMode: {
    type: Boolean,
    default: false,
  },
});

const state = ref("none");

const handleReadyPrintDashboard = (_Component, _readyPrint) => {
  emit("handleReadyPrintReport", _Component, _readyPrint);
};

onMounted(async () => {
  document.addEventListener("dragstart", () => {
    if (props.editing) {
      state.value = "dragging";
    }
  });

  document.addEventListener(
    "dragover",
    (e) => {
      e.preventDefault();
    },
    false
  );

  document.addEventListener("drop", (e) => {
    state.value = "none";

    try {
      const data = JSON.parse(e.dataTransfer.getData("text"));

      if (data.component) {
        e.preventDefault();
      }
    } catch (e) {}
  });
});
</script>

<template>
  <Toast></Toast>
  <div class="h-full">
    <dashboardBlock
      :class="'dashboard dashboard--editing dashboard--' + state"
      v-bind="props.data"
      :component-getter="props.componentGetter"
      :editing="props.editing"
      :pdfMode="props.pdfMode"
      @change="$emit('change')"
      @changing="$emit('changing')"
      @handleReadyPrintDashboardBlock="handleReadyPrintDashboard"
    ></dashboardBlock>
  </div>
</template>

<style scoped>
.dashboard {
  height: 100%;
  min-height: 100px;
}
.dashboard:-webkit-full-screen {
  width: 100%;
  height: 100%;
}
.lights-off .dashboard:-webkit-full-screen {
  background-color: black;
}
</style>
