<template>
  <div class="border-b border-gray-800">
    <section class="w-page mx-auto py-12 flex items-center">
      <div>
        <h1 class="mb-5 text-5xl font-black">{{ infoJson.servername }}</h1>
        <p>
          <a :href="infoJson.homepage" target="_blank" class="text-blue-500 inline-flex items-center">
            <span class="text-xl">去看看</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 ml-2 fill-current">
              <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z"/>
            </svg>
          </a>
        </p>
      </div>
      <dl class="ml-auto text-right flex">
        <div>
          <dt class="mb-2">世界历时</dt>
          <dd class="text-4xl font-medium">{{ worldAge }}</dd>
        </div>
        <div class="ml-10">
          <dt class="mb-2">玩家总数</dt>
          <dd class="text-4xl font-medium">{{ playersJson?.length ?? '...' }}</dd>
        </div>
      </dl>
    </section>
  </div>
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
  import {computed, defineComponent, watchEffect} from 'vue'
  import {add, formatDistanceStrict} from 'date-fns'
  import {zhCN} from 'date-fns/locale'

  import {state as footerState} from '@/components/AppFooter.vue'
  import useInfoJson from '@/composables/info-json'
  import usePlayersJson from '@/composables/players-json'

  export default defineComponent({
    name: 'HomeView',

    setup () {
      // Process info.json

      const infoJson = useInfoJson()

      const worldAge = computed(() => {
        if (infoJson.value === null) return '...'

        const now = new Date
        return formatDistanceStrict(now, add(now, {seconds: infoJson.value.worldTime}), {roundingMethod: 'floor', locale: zhCN})
      })

      watchEffect(() => footerState.dataUpdateTime = infoJson.value?.lastUpdate ?? null)

      // Process players.json

      const playersJson = usePlayersJson()

      return {
        infoJson,
        worldAge,

        playersJson,
      }
    },
  })
</script>
