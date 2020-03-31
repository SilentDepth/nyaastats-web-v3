<template>
  <div id="app" class="min-h-screen bg-gray-900 text-gray-300 flex flex-col">
    <div class="flex-none h-header bg-black text-gray-500">
      <header class="w-page h-header mx-auto flex">
        <strong class="self-center font-medium">毛玉線圈物語 Player Stats</strong>
        <span class="self-center w-6 h-6 ml-auto bg-cool-gray-800"></span>
      </header>
    </div>
    <RouterView />
    <div class="flex-none mt-auto border-t border-gray-800">
      <footer class="w-page mx-auto py-5 flex items-center">
        <p class="ml-auto text-sm text-gray-600">&copy; 毛玉線圈物語</p>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  export default defineComponent({
    name: 'App',
  })
</script>

<style src="./assets/css/base.scss" lang="scss"></style>
