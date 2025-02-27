<template>
  <section :style="{ height: '100px', border: '1px solid darkgrey' }">
    <div class="flex justify-content-center">
      Drag component at right to here !
    </div>
  </section>
</template>
<script>
export default {
  props: {
    editing: {
      type: Boolean,
      required: true,
    },
    pdfMode: {
      type: Boolean,
      required: true,
    },
    externalData: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.$emit("handleReadyPrintRealComponent", "rline", true);
  },
  methods: {
    updateData(newValue) {
      this.$emit("handleUpdateDataRealComponent", newValue);
    },
    ShowSetting() {
      console.log("showMM Line");
    },
  },
  data() {
    return {
      searchQuery: "",
      readyPrint: false,
    };
  },
};
</script>
<style></style>
