import {ref, Ref} from 'vue'

import {TimeSecond, TimeMillisecond} from '@/common/types'

interface InfoJson {
  worldTime: TimeSecond
  timeFormat: {
    full: string
    short: string
    compact: string
  }
  lastUpdate: TimeMillisecond
  advancementsProgress: {
    nether: {
      all_potions: number
      all_effect: number
    }
    adventure: {
      kill_all_mobs: number
      adventuring_time: number
    }
    husbandry: {
      bred_all_animals: number
      balanced_diet: number
    }
  }
  title: string
  servername: string
  homepage: string
}

const data: Ref<InfoJson | null> = ref(null)

async function fetchData () {
  data.value = await fetch('/data/info.json').then(res => res.json())
}

export default function useInfoJson () {
  if (!data.value) {
    fetchData()
  }

  return data
}
