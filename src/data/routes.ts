import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

type Route = {
  id: number
  name: string
  path: string
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
}

export const routes = [
  { id: 1, name: 'Unlimited', path: '/unlimited' },
  { id: 2, name: 'Roadmap', path: '/roadmap' },
  { id: 3, name: 'Contact', path: '/contact' },
] as Route[]
