<template>
  <div class="border-b border-gray-800">
    <section class="w-page mx-auto py-12 flex items-center">
      <div>
        <h1 class="mb-5 text-5xl font-black">{{ infoJson?.servername }}</h1>
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
          <dd class="text-4xl font-medium">{{ worldAge ?? '...' }}</dd>
        </div>
        <div class="ml-10">
          <dt class="mb-2">玩家总数</dt>
          <dd class="text-4xl font-medium">{{ players?.length ?? '...' }}</dd>
        </div>
      </dl>
    </section>
  </div>
  <div class="border-b border-gray-800">
    <label class="block cursor-pointer">
      <span class="block w-page mx-auto flex">
        <button class="flex-none flex items-center relative" @click="() => {keyword && (keyword = null); $refs.searchInput.focus()}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 fill-current">
            <path v-if="!keyword" d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
            <path v-else d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z" />
          </svg>
        </button>
        <input
          ref="searchInput"
          v-model="keyword"
          type="text"
          placeholder="搜索玩家"
          class="flex-1 mr-4 py-4 pl-8 -ml-6 bg-transparent"
          @focus="isSearchInputFocused = true"
          @blur="isSearchInputFocused = false"
        >
        <button class="flex-none ml-auto text-cool-gray-500">随机查看</button>
      </span>
    </label>
  </div>
  <div class="w-page mx-auto py-5">
    <div v-show="!keyword" :class="['transition-opacity duration-200 ease-linear', {'opacity-50': isSearchInputFocused}]">
      <p class="mb-5">过去 24 小时内在线的玩家：{{ recentPlayers.length }}</p>
      <PlayerList :data="recentPlayers" />
    </div>
    <div v-if="keyword">
      <p class="mb-5">匹配的玩家：{{ searchResult.length }}</p>
      <PlayerSearchResult v-if="keyword" :data="searchResult" />
    </div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, ref, Ref, watchEffect} from 'vue'
  import {add, formatDistanceStrict} from 'date-fns'
  import {zhCN} from 'date-fns/locale'

  import PlayerList from '@/components/home-view/PlayerList.vue'
  import PlayerSearchResult from '@/components/home-view/PlayerSearchResult.vue'
  import {state as footerState} from '@/components/AppFooter.vue'
  import useInfoJson from '@/composables/info-json'
  import usePlayerDB from '@/composables/player-db'
  import {PlayerBasicInfo, TimeMillisecond} from '@/common/types'

  export interface SearchResultItem extends PlayerBasicInfo {
    matchStart: number
    matchEnd: number
  }

  export default defineComponent({
    name: 'HomeView',

    components: {
      PlayerList,
      PlayerSearchResult,
    },

    setup () {
      // Process info.json

      const infoJson = useInfoJson()

      const worldAge = computed(() => {
        if (infoJson.value === null) return

        const now = new Date
        return formatDistanceStrict(now, add(now, {seconds: infoJson.value.worldTime}), {roundingMethod: 'floor', locale: zhCN})
      })

      watchEffect(() => footerState.dataUpdateTime = infoJson.value?.lastUpdate ?? null)

      // Process players.json

      const {players} = usePlayerDB()

      const recentPlayers = computed(() => {
        if (!infoJson.value?.lastUpdate || !players.value || !players.value.length) return []

        // TODO: The mechanism of `infoJson.lastUpdate` and `playersJson.#.seen` generation is unclear
        //       Will need to re-check the comparison logic here
        const baseTime: TimeMillisecond = Math.max(infoJson.value.lastUpdate, players.value![0].seen)
        const minTime: TimeMillisecond = baseTime - 1000 * 60 * 60 * 24 // 24 hours ago
        return process.env.NODE_ENV === 'development'
          ? players.value.filter(p => p.playername.length === 3 || p.playername.length === 16)
          : players.value.slice(0, players.value.findIndex(p => p.seen < minTime))
      })

      const keyword: Ref<string | null> = ref(process.env.NODE_ENV === 'development' ? 'cc' : null)
      const isSearchInputFocused = ref(false)

      const searchResult = computed(() => {
        if (!players.value || !keyword.value) return []

        const _keyword = keyword.value.toLowerCase()
        const len = _keyword.length
        const result = players.value.reduce((output, p) => {
          if (output.length >= 100) return output

          const idx = p.playername.toLowerCase().indexOf(_keyword)
          return idx >= 0 ? output.concat({...p, matchStart: idx, matchEnd: idx + len}) : output
        }, [] as SearchResultItem[]) ?? []
        return result.sort((a, b) => a.matchStart - b.matchStart)
      })

      return {
        infoJson,
        worldAge,

        players,
        recentPlayers,

        keyword,
        isSearchInputFocused,
        searchResult,
      }
    },
  })

  type __SearchResultItem = SearchResultItem
  declare module '@/views/Home.vue' {
    export type SearchResultItem = __SearchResultItem
  }
</script>
