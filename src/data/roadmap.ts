type RoadmapItem = {
  id: number
  title: string
  content: string
  dateCompleted?: Date
}

export default [
  {
    id: 1,
    title: 'Interest Using a Demo',
    content: `See if people on the Internet have an interest in this game`,
    dateCompleted: new Date('2024-11-13'),
  },
  {
    id: 2,
    title: 'Styling',
    content: `Clean up the styling on the site. Make it more useable`,
    dateCompleted: new Date('2024-11-16'),
  },
  {
    id: 3,
    title: 'Login',
    content: `Add login functionality. So in the future we can notifty users if they are about to miss a daily puzzle`,
    dateCompleted: new Date('2024-11-19'),
  },
  {
    id: 4,
    title: 'Daily Puzzle',
    content: `Create a daily puzzle system. Notify users if they are about to miss a daily puzzle`,
    dateCompleted: new Date('2024-11-22'),
  },
  {
    id: 5,
    title: 'User Rewards',
    content: `Let users see their stats, track achievements, maybe custom pokeballs for first x users, etc.`,
  },
  {
    id: 6,
    title: 'Generation filtering',
    content: `Like https://pokedoku.com/ not all players know the new age Pokemon, create the ability to filter out by generation`,
  },
  {
    id: 7,
    title: 'Leaderboard',
    content: `Add a global leaderboard. Let users know who is the very best! Completeing daily levels increases rank.`,
  },
] as RoadmapItem[]
