<template>
  <div class="flex flex-wrap">
    <!-- TODO: What if too many players? -->
    <div v-for="p of data" :key="p.uuid" class="flex-grow-0 flex-shrink w-1/5">
      <RouterLink to="/player" class="py-6 hover:bg-gray-800 rounded-md flex flex-col items-center transition duration-100 ease-linear">
        <PlayerAvatar :uuid="p.uuid" class="w-20 h-20 rounded-md image-pixelated" />
        <span class="mt-4 text-xl font-medium">{{ p.playername }}</span>
      </RouterLink>
    </div>
  </div>
  <div class="mt-5 py-4 border border-gray-800 rounded-md text-center">
    <span class="inline-block w-20 bg-cool-gray-800"></span>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  import PlayerAvatar from '@/components/PlayerAvatar.vue'

  export default defineComponent({
    name: 'PlayerList',

    components: {
      PlayerAvatar,
    },

    props: {
      data: {
        type: Array,
        required: true,
      },
    },
  })
</script>
