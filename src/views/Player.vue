<template>
  <div class="w-page mx-auto">
    <h1 class="py-5"><span class="inline-block text-4xl w-36 bg-cool-gray-800"></span></h1>
  </div>
  <div class="w-page mx-auto pb-5 flex items-start">
    <div class="flex-none w-aside">
      <div class="border border-gray-800 rounded-md">
        <div class="h-aside"></div>
        <div class="h-12 border-t border-gray-800"></div>
        <div class="h-12 border-t border-gray-800"></div>
        <div class="h-12 border-t border-gray-800"></div>
      </div>
      <h2 class="mt-5 mb-3"><span class="inline-block w-16 bg-cool-gray-800"></span></h2>
      <div class="border border-gray-800 rounded-md">
        <div class="h-12 border-t first:border-t-0 border-gray-800"></div>
        <div class="h-12 border-t first:border-t-0 border-gray-800"></div>
        <div class="h-12 border-t first:border-t-0 border-gray-800"></div>
        <div class="h-12 border-t first:border-t-0 border-gray-800"></div>
        <div class="h-12 border-t first:border-t-0 border-gray-800"></div>
        <div class="h-12 border-t first:border-t-0 border-gray-800"></div>
      </div>
    </div>
    <div class="flex-1 ml-5">
      <div class="border border-gray-800 rounded-md">
        <h2 class="p-4 border-b border-gray-800"><span class="inline-block text-xl w-8 bg-cool-gray-800"></span></h2>
        <div style="height: 600px;"></div>
      </div>
      <div class="mt-5 border border-gray-800 rounded-md">
        <h2 class="p-4 border-b border-gray-800"><span class="inline-block text-xl w-8 bg-cool-gray-800"></span></h2>
        <div style="height: 400px;"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  export default defineComponent({
    name: 'PlayerView',
  })
</script>
