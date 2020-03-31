<template>
  <div id="app" class="min-h-screen bg-gray-900 text-gray-300 flex flex-col">
    <div class="flex-none h-header bg-black text-gray-500">
      <header class="w-page h-header mx-auto flex">
        <RouterLink to="/" class="self-center font-medium">{{ infoJson?.title }}</RouterLink>
        <span class="self-center w-6 h-6 ml-auto bg-cool-gray-800"></span>
      </header>
    </div>
    <RouterView />
    <div class="flex-none mt-auto border-t border-gray-800">
      <AppFooter />
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  import AppFooter from '@/components/AppFooter.vue'
  import useInfoJson from '@/composables/info-json'

  export default defineComponent({
    name: 'App',

    components: {
      AppFooter,
    },

    setup () {
      const infoJson = useInfoJson()

      return {
        infoJson,
      }
    },
  })
</script>

<style src="./assets/css/base.scss" lang="scss"></style>
