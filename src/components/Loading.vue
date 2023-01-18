<script setup></script>
<template>
  <div
    wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center"
  >
    <div class="flex items-center justify-center space-x-2">
      <div class="w-2 h-2 rounded-full animate-pulse bg-blue-600"></div>
      <div class="w-2 h-2 rounded-full animate-pulse bg-blue-600"></div>
      <div class="w-2 h-2 rounded-full animate-pulse bg-blue-600"></div>
    </div>
  </div>
</template>
