import type { DynamoDBRecord } from 'aws-lambda'
import type { V6Client } from '@aws-amplify/api-graphql'
import { Schema } from '../../../../data/resource'
import {
  listUserAcheivements,
  listUserTests,
} from '../../../../graphql/queries'
import milestoneAchievementsCheck from './milestone'
import streakAchievementsCheck from './streak'
import winStreakAchievementsCheck from './winStreak'

export default async (client: V6Client<Schema>, record: DynamoDBRecord) => {
  if (record.eventName === 'INSERT' || record.eventName === 'MODIFY') {
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
            eq: userId.split(':')[0],
          },
        },
      },
    })

    const userAcheivements = userAcheivementsData.listUserAcheivements.items
    const userTests = userTestsData.listUserTests.items

    // Only check these acheivements when a NEW test is started
    if (record.eventName === 'INSERT') {
      await milestoneAchievementsCheck(client, userAcheivements)
      await streakAchievementsCheck(client, userAcheivements, userTests, record)
    }

    // Only check these acheivements when a test is completed/modified
    if (record.eventName === 'MODIFY') {
    }

    // Only check these acheivements when a test is either completed or modified
    await winStreakAchievementsCheck(client, userAcheivements, userTests)
  }
}
