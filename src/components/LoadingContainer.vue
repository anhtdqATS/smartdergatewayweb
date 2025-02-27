<template>
  <div v-if="isLoading" class="overlay-loader bg-white dark:bg-black">
    <div class="container">
      <span class=""></span>
      <div class="line bg-[#e8e8e8] dark:bg-[#999999]">
        <div class="inner"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["isLoading"]);
</script>

<style scoped>
.overlay-loader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.container {
  width: 200px;
  height: 200px;
  background-size: cover;
  vertical-align: middle;
  margin: 20% auto;
}

.fa-linkedin {
  display: block;
  font-size: 5em;
  text-align: center;
  color: #0077b5;
}

.line {
  height: 3px;
  width: 100%;
  margin-top: 30%;
}

.line .inner {
  width: 100%;
  height: inherit;
  background: #88724f;
  animation: slide 2s ease-in-out infinite;
}

@keyframes slide {
  0% {
    transform-origin: left;
    transform: scaleX(0.3);
  }
  25% {
    transform-origin: left;
    transform: scaleX(1);
  }
  26% {
    transform-origin: right;
    transform: scaleX(1);
  }
  50% {
    transform-origin: right;
    transform: scaleX(0.3);
  }
  75% {
    transform-origin: right;
    transform: scaleX(1);
  }
  76% {
    transform-origin: left;
    transform: scaleX(1);
  }
  100% {
    transform-origin: left;
    transform: scaleX(0.3);
  }
}
</style>
