import { generateClient } from 'aws-amplify/api'
import { Schema } from '@/amplify/data/resource'
import outputs from '@/amplify_outputs.json'
import { Amplify } from 'aws-amplify'

Amplify.configure(outputs)
const client = generateClient<Schema>()

export default async (
  lastDailyGame: Schema['UserTests']['type'] | undefined
) => {
  if (!lastDailyGame) {
    return
  }

  const { data: userTests } = await client.models.UserTests.list({
    limit: 1,
    filter: {
      testId: {
        eq: lastDailyGame.testId as string,
      },
    },
  })

  if (userTests.length > 0) {
    return
  }

  if (lastDailyGame.testId) {
    await client.models.UserTests.create({
      ...lastDailyGame,
    })
  }
}
