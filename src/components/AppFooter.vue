<template>
  <footer class="w-page mx-auto py-5 flex items-center">
    <p v-if="dataUpdateTime" class="text-sm text-gray-600">数据更新时间：{{ dataUpdateTime }}</p>
    <p class="ml-auto text-sm text-gray-600">&copy; {{ infoJson?.servername }}</p>
  </footer>
</template>

<script lang="ts">
  import {computed, reactive} from 'vue'
  import {format} from 'date-fns'

  import useInfoJson from '@/composables/info-json'
  import {TimeMillisecond} from '@/common/types'

  export const state = reactive({
    dataUpdateTime: null as TimeMillisecond | null,
  })

  export default {
    name: 'AppFooter',

    setup () {
      const infoJson = useInfoJson()

      const dataUpdateTime = computed(() => state.dataUpdateTime && format(state.dataUpdateTime, 'yyyy-MM-dd HH:mm:ss'))

      return {
        infoJson,

        dataUpdateTime,
      }
    },
  }

  type State = typeof state
  declare module '@/components/AppFooter.vue' {
    export const state: State
  }
</script>
