import { defineFunction } from '@aws-amplify/backend'

export const streamTestUpdates = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'stream-test-updates',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  timeoutSeconds: 5,
})
