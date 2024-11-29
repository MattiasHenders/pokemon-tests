import milestone from './milestone'
import streak from './streak'
import winStreak from './winStreak'

export type Achievement = {
  id: string
  name: string
  description: string
  image: string
}

export default [...streak, ...winStreak, ...milestone]
