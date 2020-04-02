export type TimeMillisecond = number
export type TimeSecond = number

export type Uuid = string
export type Playername = string

export interface PlayerBasicInfo {
  uuid: Uuid
  playername: Playername
  names: PlayerNameHistoryRecord[]
  seen: TimeMillisecond
}

// FIXME: Too generic
export interface PlayerStats {
  stats: any
  advancements: any
  data: any
}

export interface PlayerNameHistoryRecord {
  name: Playername
  changedToAt?: TimeMillisecond
}
