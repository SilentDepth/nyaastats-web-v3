<template>
  <div id="app" class="min-h-screen bg-gray-900 text-gray-300 flex flex-col">
    <div class="flex-none h-header bg-black text-gray-500">
      <header class="w-page h-header mx-auto flex">
        <strong class="self-center font-medium">毛玉線圈物語 Player Stats</strong>
        <span class="self-center w-6 h-6 ml-auto bg-cool-gray-800"></span>
      </header>
    </div>
    <div class="border-b border-gray-800" style="height: 300px;"></div>
    <div class="border-b border-gray-800">
      <div class="w-page mx-auto py-4 flex">
        <span class="h-4 w-40 bg-cool-gray-800"></span>
        <span class="h-4 w-16 ml-auto bg-cool-gray-800"></span>
      </div>
    </div>
    <div class="w-page mx-auto py-5">
      <div class="flex flex-wrap -ml-5 -mt-5">
        <div v-for="n of 40" :key="n" class="flex-grow-0 flex-shrink w-1/4 pl-5 mt-5">
          <div class="p-4 border border-gray-800 rounded-md flex">
            <div class="w-16 h-16 border border-cool-gray-800 rounded-md"></div>
          </div>
        </div>
      </div>
      <div class="mt-5 py-4 border border-gray-800 rounded-md text-center">
        <span class="inline-block h-4 w-20 bg-cool-gray-800"></span>
      </div>
    </div>
    <div class="flex-none mt-auto border-t border-gray-800">
      <footer class="w-page mx-auto py-5 flex items-center">
        <p class="ml-auto text-sm text-gray-600">&copy; 毛玉線圈物語</p>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  import HelloWorld from './components/HelloWorld.vue'

  export default defineComponent({
    name: 'App',

    components: {
      HelloWorld,
    },
  })
</script>

<style src="./assets/css/base.scss" lang="scss"></style>
