import { Achievement } from '.'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'

export const streakAchievement1: Achievement = {
  id: 'streak-1',
  name: 'Club Member',
  description: 'Play 5 days in a row',
  image: {
    size: 42,
    color: 'bronze',
    src: CatchingPokemonIcon,
  },
  total: 5,
}

export const streakAchievement2: Achievement = {
  id: 'streak-2',
  name: 'Super Nerd',
  description: 'Play 14 days in a row',
  image: {
    size: 52,
    color: 'silver',
    src: CatchingPokemonIcon,
  },
  total: 14,
}

export const streakAchievement3: Achievement = {
  id: 'streak-3',
  name: 'Poké Maniac',
  description: 'Play 30 days in a row',
  image: {
    size: 62,
    color: 'gold',
    src: CatchingPokemonIcon,
  },
  total: 30,
}

export default [streakAchievement1, streakAchievement2, streakAchievement3]
