import type { DynamoDBRecord } from 'aws-lambda'
import type { V6Client } from '@aws-amplify/api-graphql'
import { Schema } from '../../../../data/resource'
import { updateUserAcheivements } from '../../../../graphql/mutations'

export default async (
  client: V6Client<Schema>,
  userAcheivements: Schema['UserAcheivements']['type'][],
  userTests: Schema['UserTests']['type'][],
  record: DynamoDBRecord
) => {
  const mostRecentTest = userTests.sort((a, b) => {
    if (!a.createdAt) return 1 // Treat null as older
    if (!b.createdAt) return -1
    return (
      new Date(b.createdAt).getMilliseconds() -
      new Date(a.createdAt).getMilliseconds()
    )
  })[0]

  const todaysTestDate = record?.dynamodb?.NewImage?.createdAt.S

  if (!mostRecentTest || !todaysTestDate) {
    return
  }

  // Check if mostRecentTest is yesterday
  const isYesterday = (() => {
    const today = new Date(todaysTestDate)
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    const mostRecentDate = new Date(mostRecentTest.createdAt)

    // Compare the dates (ignoring time)
    return (
      mostRecentDate.getFullYear() === yesterday.getFullYear() &&
      mostRecentDate.getMonth() === yesterday.getMonth() &&
      mostRecentDate.getDate() === yesterday.getDate()
    )
  })()

  const streakAchievementsToUpdate = userAcheivements.filter(
    (acheivement) =>
      acheivement.acheivementId?.startsWith('streak') && !acheivement.completed
  )

  for (const streakAchievement of streakAchievementsToUpdate) {
    const streakAchievementId = streakAchievement.id

    if (!streakAchievementId) {
      continue
    }

    const newProgress = isYesterday ? (streakAchievement.progress || 0) + 1 : 1

    await client.graphql({
      query: updateUserAcheivements,
      variables: {
        input: {
          id: streakAchievementId,
          completed: newProgress === streakAchievement.total,
          progress: newProgress,
        },
      },
    })
  }
}
