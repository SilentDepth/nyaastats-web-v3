<template>
  <div class="border-b border-gray-800" style="height: 300px;"></div>
  <div class="border-b border-gray-800">
    <div class="w-page mx-auto py-4 flex">
      <span class="w-40 bg-cool-gray-800"></span>
      <span class="w-16 ml-auto bg-cool-gray-800"></span>
    </div>
  </div>
  <div class="w-page mx-auto py-5">
    <div class="flex flex-wrap -ml-5 -mt-5">
      <div v-for="n of 40" :key="n" class="flex-grow-0 flex-shrink w-1/4 pl-5 mt-5">
        <RouterLink to="/player" class="p-4 border border-gray-800 rounded-md flex">
          <i class="w-16 h-16 border border-cool-gray-800 rounded-md"></i>
        </RouterLink>
      </div>
    </div>
    <div class="mt-5 py-4 border border-gray-800 rounded-md text-center">
      <span class="inline-block w-20 bg-cool-gray-800"></span>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  export default defineComponent({
    name: 'HomeView',
  })
</script>
