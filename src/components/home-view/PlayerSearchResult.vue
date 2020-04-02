<template>
  <ul class="-my-2">
    <li v-for="p of data" class="">
      <RouterLink to="/player" class="-mx-3 px-3 py-2 hover:bg-gray-800 rounded-md flex items-center">
        <PlayerAvatar :uuid="p.uuid" class="flex-none w-10 h-10 rounded" />
        <span v-html="highlightHtml(playerMap[p.uuid].playername, p.matchStart, p.matchEnd)" class="flex-1 pl-4 text-xl" />
        <code class="flex-none ml-auto pl-4 text-xl text-gray-600">{{ p.uuid }}</code>
      </RouterLink>
    </li>
  </ul>
</template>

<script lang="ts">
  import {defineComponent, PropType} from 'vue'

  import PlayerAvatar from '@/components/PlayerAvatar.vue'
  import usePlayerDB from '@/composables/player-db'
  import {SearchResultItem} from '@/views/Home.vue'

  export default defineComponent({
    name: 'PlayerSearchResult',

    components: {
      PlayerAvatar,
    },

    props: {
      data: {
        type: Array as PropType<SearchResultItem[]>,
        required: true,
      },
    },

    setup () {
      const {playerMap} = usePlayerDB()

      function highlightHtml (str: string, start: number, end: number): string {
        return str.slice(0, start) + '<em>' + str.slice(start, end) + '</em>' + str.slice(end)
      }

      return {
        playerMap,

        highlightHtml,
      }
    },
  })
</script>

<style scoped>
  ul >>> em {
    @apply text-red-500 not-italic;
  }
</style>
