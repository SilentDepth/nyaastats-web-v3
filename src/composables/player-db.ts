import {ref, Ref, computed} from 'vue'

import {PlayerBasicInfo, PlayerStats, Uuid} from '@/common/types'

const players: Ref<PlayerBasicInfo[] | null> = ref(null)
const allStats: Ref<{[uuid: string]: PlayerStats}> = ref({})
let isFetchingPlayers = false

type PlayerMap = {[uuid: string]: PlayerBasicInfo}
const playerMap: Ref<PlayerMap> = computed(() => players.value?.reduce((map, p) => {
  map[p.uuid] = p
  return map
}, {} as PlayerMap) ?? {})

const allStatsProxy = new Proxy(allStats, {
  get: async (target, uuid: Uuid) => target.value[uuid] ?? fetchPlayerStats(uuid),
})

async function fetchPlayerList (): Promise<PlayerBasicInfo[]> {
  const data = await fetch('/data/players.json').then(res => res.json())
  players.value = data
  isFetchingPlayers = false
  return data
}

async function fetchPlayerStats (uuid: Uuid): Promise<PlayerStats> {
  const data = await fetch(`/data/${uuid}/stats.json`).then(res => res.json())
  allStats.value[uuid] = data
  return data
}

export default function usePlayerDB () {
  if (!players.value && !isFetchingPlayers) {
    isFetchingPlayers = true
    fetchPlayerList()
  }

  return {
    players,
    playerMap,

    allStats: allStatsProxy,
  }
}
