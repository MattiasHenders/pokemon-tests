import type { DynamoDBRecord } from 'aws-lambda'
import type { V6Client } from '@aws-amplify/api-graphql'
import { Schema } from '../../../../data/resource'
import {
  listUserAcheivements,
  listUserTests,
} from '../../../../graphql/queries'
import milestoneAchievementsCheck from './milestone'

export default async (client: V6Client<Schema>, record: DynamoDBRecord) => {
  const userId = record?.dynamodb?.NewImage?.userId.S
  if (!userId) {
    return
  }

  const { data: userTestsData } = await client.graphql({
    query: listUserTests,
    variables: {
      filter: {
        userId: {
          eq: userId,
        },
      },
    },
  })

  const { data: userAcheivementsData } = await client.graphql({
    query: listUserAcheivements,
    variables: {
      filter: {
        userId: {
          eq: userId,
        },
      },
    },
  })

  const userAcheivements = userAcheivementsData.listUserAcheivements.items
  const userTests = userTestsData.listUserTests.items

  // Now that we have the users tests, we can check for achievements
  await milestoneAchievementsCheck(client, userAcheivements)
}
