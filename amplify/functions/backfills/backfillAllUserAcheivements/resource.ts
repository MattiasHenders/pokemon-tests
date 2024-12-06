import { defineFunction } from '@aws-amplify/backend'

export const backfillAllUserAcheivements = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'backfill-all-user-acheivements',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  timeoutSeconds: 30,
})
