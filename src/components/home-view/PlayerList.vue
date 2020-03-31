<template>
  <div class="w-page mx-auto py-5">
    <p class="mb-5">过去 24 小时内在线的玩家：{{ recentPlayers.length }}</p>
    <div class="flex flex-wrap -ml-5 -mt-5">
      <!-- TODO: What if too many players? -->
      <div v-for="p of recentPlayers" :key="p.uuid" class="flex-grow-0 flex-shrink w-1/4 pl-5 mt-5">
        <RouterLink to="/player" class="p-4 border border-gray-800 hover:bg-gray-800 rounded-md flex items-center transition duration-100 ease-linear">
          <img :src="`/data/${p.uuid}/avatar.png`" :alt="`${p.playername}'s avatar`" class="w-16 h-16 rounded-md">
          <span class="ml-4 text-xl font-medium">{{ p.playername }}</span>
        </RouterLink>
      </div>
    </div>
    <div class="mt-5 py-4 border border-gray-800 rounded-md text-center">
      <span class="inline-block w-20 bg-cool-gray-800"></span>
    </div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent} from 'vue'

  import useInfoJson from '@/composables/info-json'
  import usePlayersJson from '@/composables/players-json'
  import {TimeMillisecond} from '@/common/types'

  export default defineComponent({
    name: 'PlayerList',

    setup () {
      const infoJson = useInfoJson()
      const playersJson = usePlayersJson()

      const recentPlayers = computed(() => {
        if (!infoJson.value?.lastUpdate || !playersJson.value || !playersJson.value.length) return []

        // TODO: The mechanism of `infoJson.lastUpdate` and `playersJson.#.seen` generation is unclear
        //       Will need to re-check the comparison logic here
        const baseTime: TimeMillisecond = Math.max(infoJson.value.lastUpdate, playersJson.value![0].seen)
        const minTime: TimeMillisecond = baseTime - 1000 * 60 * 60 * 24 // 24 hours ago
        return playersJson.value.slice(0, playersJson.value.findIndex(p => p.seen < minTime))
      })

      return {
        recentPlayers,
      }
    },
  })
</script>
