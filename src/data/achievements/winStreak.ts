import { Achievement } from '.'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'

export const winStreakAchievement1: Achievement = {
  id: 'win-streak-1',
  name: 'Ember',
  description: 'Beat an Impossible Test 2 days in a row',
  image: {
    size: 42,
    color: 'bronze',
    src: LocalFireDepartmentIcon,
  },
  total: 2,
}

export const winStreakAchievement2: Achievement = {
  id: 'win-streak-2',
  name: 'Flamethrower',
  description: 'Beat an Impossible Test 7 days in a row',
  image: {
    size: 48,
    color: 'silver',
    src: LocalFireDepartmentIcon,
  },
  total: 7,
}

export const winStreakAchievement3: Achievement = {
  id: 'win-streak-3',
  name: 'Fire Blast',
  description: 'Beat an Impossible Test 10 days in a row',
  image: {
    size: 56,
    color: 'gold',
    src: LocalFireDepartmentIcon,
  },
  total: 10,
}

export const winStreakAchievement4: Achievement = {
  id: 'win-streak-4',
  name: 'Max Flare',
  description: 'Beat an Impossible Test 15 days in a row',
  image: {
    size: 62,
    color: 'platinum',
    src: LocalFireDepartmentIcon,
  },
  total: 15,
}

export default [
  winStreakAchievement1,
  winStreakAchievement2,
  winStreakAchievement3,
  winStreakAchievement4,
]
