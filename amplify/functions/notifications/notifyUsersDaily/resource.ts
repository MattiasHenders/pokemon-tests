import { defineFunction } from '@aws-amplify/backend'

export const notifyUsersDaily = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'notify-users-daily',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  schedule: '0 12 * * ? *',
  timeoutSeconds: 45,
})
