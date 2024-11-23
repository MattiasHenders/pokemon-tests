import { defineFunction } from '@aws-amplify/backend'

export const generateDailyPuzzle = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'generate-daily-puzzle',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  schedule: 'every day',
})
