import { Achievement } from '.'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

export const milestoneAchievement1: Achievement = {
  id: 'milestone-1',
  name: 'New Trainer',
  description: 'Complete your first Test',
  image: {
    size: 42,
    color: 'bronze',
    src: EmojiEventsIcon,
  },
  total: 1,
}

export const milestoneAchievement2: Achievement = {
  id: 'milestone-2',
  name: 'Youngster',
  description: 'Complete 5 tests',
  image: {
    size: 46,
    color: 'silver',
    src: EmojiEventsIcon,
  },
  total: 5,
}

export const milestoneAchievement3: Achievement = {
  id: 'milestone-3',
  name: 'School Kid',
  description: 'Complete 10 tests',
  image: {
    size: 50,
    color: 'gold',
    src: EmojiEventsIcon,
  },
  total: 10,
}

export const milestoneAchievement4: Achievement = {
  id: 'milestone-4',
  name: 'Ace Trainer',
  description: 'Complete 20 tests',
  image: {
    size: 52,
    color: 'platinum',
    src: EmojiEventsIcon,
  },
  total: 20,
}

export const milestoneAchievement5: Achievement = {
  id: 'milestone-5',
  name: 'Gym Leader',
  description: 'Complete 50 tests',
  image: {
    size: 54,
    color: 'ruby',
    src: EmojiEventsIcon,
  },
  total: 50,
}

export const milestoneAchievement6: Achievement = {
  id: 'milestone-6',
  name: 'Elite Four',
  description: 'Complete 100 tests',
  image: {
    size: 58,
    color: 'emerald',
    src: EmojiEventsIcon,
  },
  total: 100,
}

export const milestoneAchievement7: Achievement = {
  id: 'milestone-7',
  name: 'Champion',
  description: 'Complete 200 tests',
  image: {
    size: 62,
    color: 'diamond',
    src: EmojiEventsIcon,
  },
  total: 200,
}

export default [
  milestoneAchievement1,
  milestoneAchievement2,
  milestoneAchievement3,
  milestoneAchievement4,
  milestoneAchievement5,
  milestoneAchievement6,
  milestoneAchievement7,
]
