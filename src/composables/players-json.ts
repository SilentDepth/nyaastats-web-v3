import {Ref, ref} from 'vue'

import {Playername, TimeMillisecond, Uuid} from '@/common/types'

interface PlayerBasicInfo {
  uuid: Uuid
  playername: Playername
  names: PlayerNameHistoryRecord[]
  seen: TimeMillisecond
}

interface PlayerNameHistoryRecord {
  name: Playername
  changedToAt?: TimeMillisecond
}

const data: Ref<PlayerBasicInfo[] | null> = ref(null)

async function fetchData () {
  data.value = await fetch('/data/players.json').then(res => res.json())
}

export default function usePlayersJson () {
  if (!data.value) {
    fetchData()
  }

  return data
}
