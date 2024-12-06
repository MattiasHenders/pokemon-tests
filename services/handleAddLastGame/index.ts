import { generateClient } from 'aws-amplify/api'
import { Schema } from '@/amplify/data/resource'
import outputs from '@/amplify_outputs.json'
import { Amplify } from 'aws-amplify'

Amplify.configure(outputs)
const client = generateClient<Schema>()

export default async (
  lastDailyGame: Schema['UserTests']['type'] | undefined,
  userId: string
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

  const { data: dailyTest, errors: dailyTestErrors } =
    await client.models.DailyTest.get({ id: lastDailyGame.testId as string })

  if (dailyTestErrors) {
    return
  }

  // Check if the test being update is for the current day in UTC
  if (
    dailyTest?.createdAt.split('T')[0] !==
    new Date().toISOString().split('T')[0]
  ) {
    return
  }

  if (lastDailyGame.testId) {
    await client.models.UserTests.create({
      ...lastDailyGame,
      userId,
    })
  }
}
