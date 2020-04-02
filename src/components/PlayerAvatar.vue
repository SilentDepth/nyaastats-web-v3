<template>
  <img :src="`/data/${uuid}/avatar.png`" :alt="`${playerMap[uuid].playername}'s avatar`" class="image-pixelated">
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  import usePlayerDB from '@/composables/player-db'

  export default defineComponent({
    name: 'PlayerAvatar',

    props: {
      uuid: {
        type: String,
        required: true,
      },
    },

    setup () {
      const {playerMap} = usePlayerDB()

      return {
        playerMap,
      }
    },
  })
</script>
