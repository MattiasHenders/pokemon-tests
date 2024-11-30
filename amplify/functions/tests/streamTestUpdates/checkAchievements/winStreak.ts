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

  const winStreakAchievementsToUpdate = userAcheivements.filter(
    (acheivement) =>
      acheivement.acheivementId?.startsWith('win-streak') &&
      !acheivement.completed
  )

  for (const winStreakAchievement of winStreakAchievementsToUpdate) {
    const winStreakAchievementId = winStreakAchievement.id

    if (!winStreakAchievementId) {
      continue
    }

    const newProgress =
      isYesterday && mostRecentTest.points === 150
        ? (winStreakAchievement.progress || 0) + 1
        : 0

    await client.graphql({
      query: updateUserAcheivements,
      variables: {
        input: {
          id: winStreakAchievementId,
          completed: newProgress === winStreakAchievement.total,
          progress: newProgress,
        },
      },
    })
  }
}
