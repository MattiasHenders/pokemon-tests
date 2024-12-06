import { OverridableComponent } from '@mui/material/OverridableComponent'
import milestone from './milestone'
import streak from './streak'
import winStreak from './winStreak'
import { SvgIconTypeMap } from '@mui/material'

export type Achievement = {
  id: string
  name: string
  description: string
  image: {
    size: number
    color: string
    src: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
      muiName: string
    }
  }
  total: number
}

export default [...streak, ...winStreak, ...milestone]
