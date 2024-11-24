import { v4 as uuidv4 } from 'uuid'

type RoadmapItem = {
  id: string
  title: string
  content: string
  dateCompleted?: Date
}

export default [
  {
    id: uuidv4(),
    title: 'Interest Using a Demo',
    content: `See if people on the Internet have an interest in this game`,
    dateCompleted: new Date('2024-11-13'),
  },
  {
    id: uuidv4(),
    title: 'Styling',
    content: `Clean up the styling on the site. Make it more useable`,
    dateCompleted: new Date('2024-11-16'),
  },
  {
    id: uuidv4(),
    title: 'Login',
    content: `Add login functionality. So in the future we can notifty users if they are about to miss a daily puzzle`,
    dateCompleted: new Date('2024-11-19'),
  },
  {
    id: uuidv4(),
    title: 'Daily Puzzle',
    content: `Create a daily puzzle system. Notify users if they are about to miss a daily puzzle`,
    dateCompleted: new Date('2024-11-22'),
  },
  {
    id: uuidv4(),
    title: 'Styling for Daily vs Unlimited',
    content: `Different styling for daily vs unlimited game modes.`,
  },
  {
    id: uuidv4(),
    title: 'User Stats',
    content: `Let users see their stats.`,
  },
  {
    id: uuidv4(),
    title: 'User Acheivements',
    content: `Let users track achievements, maybe custom pokeballs for first x users, etc.`,
  },
  {
    id: uuidv4(),
    title: 'Generation filtering',
    content: `Like https://pokedoku.com/ not all players know the new age Pokemon, create the ability to filter out by generation`,
  },
  {
    id: uuidv4(),
    title: 'Leaderboard',
    content: `Add a global leaderboard. Let users know who is the very best! Completeing daily levels increases rank.`,
  },
] as RoadmapItem[]
