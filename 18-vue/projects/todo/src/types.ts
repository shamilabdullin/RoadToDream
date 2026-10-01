export interface Task {
  id: number
  title: string
  done: boolean
}

export type Filter = 'all' | 'active' | 'done'
