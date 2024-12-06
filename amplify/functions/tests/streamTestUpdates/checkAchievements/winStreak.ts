import type { V6Client } from '@aws-amplify/api-graphql'
import { Schema } from '../../../../data/resource'
import { updateUserAcheivements } from '../../../../graphql/mutations'

export default async (
  client: V6Client<Schema>,
  userAcheivements: Schema['UserAcheivements']['type'][],
  userTests: Schema['UserTests']['type'][]
) => {
  const mostRecentTests = userTests.sort((a, b) => {
    if (!a.createdAt) return 1 // Treat null as older
    if (!b.createdAt) return -1
    return (
      new Date(b.createdAt).getMilliseconds() -
      new Date(a.createdAt).getMilliseconds()
    )
  })

  const winStreakAchievementsToUpdate = userAcheivements.filter(
    (acheivement) =>
      acheivement.acheivementId?.startsWith('win-streak') &&
      !acheivement.completed
  )

  // Handle the case where there are less than 2 tests
  if (mostRecentTests.length === 0) {
    return
  } else if (mostRecentTests.length === 1) {
    // If there is only one test, check if it is a win
    const mostRecentTest = mostRecentTests[0]

    for (const winStreakAchievement of winStreakAchievementsToUpdate) {
      const winStreakAchievementId = winStreakAchievement.id

      if (!winStreakAchievementId) {
        continue
      }

      const newProgress = mostRecentTest.points === 150 ? 1 : 0

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

    return
  }

  // Handle the case where there are 2 or more tests
  const mostRecentTest = mostRecentTests[0]
  const secondMostRecentTest = mostRecentTests[1]

  // Check if the two most recent tests are today and yesterday
  const areTestsTodayAndYesterday = (() => {
    const today = new Date(mostRecentTest.createdAt)
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    const secondMostRecentDate = new Date(secondMostRecentTest.createdAt)

    // Compare the dates (ignoring time)
    return (
      secondMostRecentDate.getFullYear() === yesterday.getFullYear() &&
      secondMostRecentDate.getMonth() === yesterday.getMonth() &&
      secondMostRecentDate.getDate() === yesterday.getDate()
    )
  })()

  for (const winStreakAchievement of winStreakAchievementsToUpdate) {
    const winStreakAchievementId = winStreakAchievement.id

    if (!winStreakAchievementId) {
      continue
    }

    let newProgress = 0

    if (!areTestsTodayAndYesterday) {
      newProgress = mostRecentTest.points === 150 ? 1 : 0
    } else {
      if (secondMostRecentTest.points === 150) {
        newProgress =
          mostRecentTest.points === 150
            ? (winStreakAchievement.progress || 0) + 1
            : winStreakAchievement.progress || 0
      } else {
        newProgress = mostRecentTest.points === 150 ? 1 : 0
      }
    }

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
