import type { DynamoDBStreamHandler } from 'aws-lambda'
import { generateClient } from 'aws-amplify/api'
import { Schema } from '../../../data/resource'
import { Amplify } from 'aws-amplify'
import { env } from '$amplify/env/stream-test-updates'
import {
  listUserAcheivements,
  listUserStats,
  listUserTests,
} from '../../../graphql/queries'
import allAchievements from '../../../../src/data/achievements'
import { createUserAcheivements } from '../../../graphql/mutations'

Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT,
        region: env.AWS_REGION,
        defaultAuthMode: 'identityPool',
      },
    },
  },
  {
    Auth: {
      credentialsProvider: {
        getCredentialsAndIdentityId: async () => ({
          credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            sessionToken: env.AWS_SESSION_TOKEN,
          },
        }),
        clearCredentialsAndIdentityId: () => {},
      },
    },
  }
)

const client = generateClient<Schema>()

export const handler: DynamoDBStreamHandler = async (event) => {
  // Get all users via listUserStats
  const { data: userStats } = await client.graphql({
    query: listUserStats,
  })

  // Loop through each user, check if they have achievements, if not, create them
  for (const userStat of userStats.listUserStats.items) {
    const { data: usersAcheivements } = await client.graphql({
      query: listUserAcheivements,
      variables: {
        filter: {
          userId: {
            eq: userStat.id,
          },
        },
      },
    })

    const { data: userTests } = await client.graphql({
      query: listUserTests,
      variables: {
        filter: {
          userId: {
            eq: userStat.id,
          },
        },
      },
    })

    const orderedUserTests = userTests.listUserTests.items.sort((a, b) => {
      if (!a.createdAt) return 1 // Treat null as older
      if (!b.createdAt) return -1
      return (
        new Date(b.createdAt).getMilliseconds() -
        new Date(a.createdAt).getMilliseconds()
      )
    })

    for (const acheivement of allAchievements) {
      if (
        !usersAcheivements.listUserAcheivements.items.find(
          (item) => item.acheivementId === acheivement.id
        )
      ) {
        if (acheivement.id.startsWith('milestone')) {
          await client.graphql({
            query: createUserAcheivements,
            variables: {
              input: {
                userId: userStat.id,
                acheivementId: acheivement.id,
                total: acheivement.total,
                progress: Math.min(orderedUserTests.length, acheivement.total),
                completed: orderedUserTests.length >= acheivement.total,
              },
            },
          })
        } else if (acheivement.id.startsWith('win-streak')) {
          if (orderedUserTests.length < 2) {
            await client.graphql({
              query: createUserAcheivements,
              variables: {
                input: {
                  userId: userStat.id,
                  acheivementId: acheivement.id,
                  total: acheivement.total,
                  progress: orderedUserTests.length
                    ? orderedUserTests[0].points === 150
                      ? 1
                      : 0
                    : 0,
                  completed: orderedUserTests.length >= acheivement.total,
                },
              },
            })

            continue
          }

          let maxStreak = 0
          let currentStreak = orderedUserTests[0].points === 150 ? 1 : 0
          console.log('acheivement', acheivement.id, 'start')
          for (let i = 1; i < orderedUserTests.length; i++) {
            console.log('acheivement', i, orderedUserTests[i])
            const previousTest = orderedUserTests[i - 1]
            const currentTest = orderedUserTests[i]

            // Check if the current test is today and the next test is yesterday
            const areTestsTodayAndYesterday = (() => {
              const today = new Date(currentTest.createdAt)
              const yesterday = new Date(today)
              yesterday.setDate(today.getDate() + 1)

              const secondMostRecentDate = new Date(previousTest.createdAt)

              // Compare the dates (ignoring time)
              return (
                secondMostRecentDate.getFullYear() ===
                  yesterday.getFullYear() &&
                secondMostRecentDate.getMonth() === yesterday.getMonth() &&
                secondMostRecentDate.getDate() === yesterday.getDate()
              )
            })()

            console.log(
              'acheivement',
              acheivement.id,
              areTestsTodayAndYesterday,
              currentTest,
              previousTest
            )

            if (
              areTestsTodayAndYesterday &&
              currentTest.points === 150 &&
              previousTest.points === 150
            ) {
              currentStreak += 1
              if (currentStreak > maxStreak) {
                maxStreak = currentStreak
              }
            } else {
              currentStreak = currentTest.points === 150 ? 1 : 0
            }
          }

          await client.graphql({
            query: createUserAcheivements,
            variables: {
              input: {
                userId: userStat.id,
                acheivementId: acheivement.id,
                total: acheivement.total,
                progress: Math.min(maxStreak, acheivement.total),
                completed: maxStreak >= acheivement.total,
              },
            },
          })
        } else if (acheivement.id.startsWith('streak')) {
          if (orderedUserTests.length < 2) {
            await client.graphql({
              query: createUserAcheivements,
              variables: {
                input: {
                  userId: userStat.id,
                  acheivementId: acheivement.id,
                  total: acheivement.total,
                  progress: orderedUserTests.length,
                  completed: orderedUserTests.length >= acheivement.total,
                },
              },
            })

            continue
          }

          let maxStreak = 1
          let currentStreak = 1
          for (let i = 0; i < orderedUserTests.length - 1; i++) {
            const currentTest = orderedUserTests[i]
            const nextTest = orderedUserTests[i + 1]

            // Check if the current test is today and the next test is yesterday
            const areTestsTodayAndYesterday = (() => {
              const today = new Date(currentTest.createdAt)
              const yesterday = new Date(today)
              yesterday.setDate(today.getDate() - 1)

              const secondMostRecentDate = new Date(nextTest.createdAt)

              // Compare the dates (ignoring time)
              return (
                secondMostRecentDate.getFullYear() ===
                  yesterday.getFullYear() &&
                secondMostRecentDate.getMonth() === yesterday.getMonth() &&
                secondMostRecentDate.getDate() === yesterday.getDate()
              )
            })()

            if (areTestsTodayAndYesterday) {
              currentStreak += 1
              if (currentStreak > maxStreak) {
                maxStreak = currentStreak
              }
            } else {
              currentStreak = 1
            }
          }

          await client.graphql({
            query: createUserAcheivements,
            variables: {
              input: {
                userId: userStat.id,
                acheivementId: acheivement.id,
                total: acheivement.total,
                progress: Math.min(maxStreak, acheivement.total),
                completed: maxStreak >= acheivement.total,
              },
            },
          })
        }
      }
    }
  }
}
