<template>
  <div id="app" class="min-h-screen bg-gray-900 text-gray-300 flex flex-col">
    <div class="flex-none h-header bg-black text-gray-500">
      <header class="w-page h-header mx-auto flex">
        <RouterLink to="/" class="self-center font-medium">{{ infoJson?.title }}</RouterLink>
        <button class="ml-auto flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 fill-current text-cool-gray-500">
            <path d="M12.866 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0zm-8.66 16h15.588L12 5.5 4.206 19zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z" />
          </svg>
        </button>
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
