import { generateClient } from 'aws-amplify/api'
import type { EventBridgeHandler } from 'aws-lambda'
import { Schema } from '../../../data/resource'
import { Amplify } from 'aws-amplify'
import { env } from '$amplify/env/notify-users-daily'
import { listUserStats, listUserTests } from '../../../graphql/queries'
import listAllCognitoUsers from './listAllUsers'
import sendEmail from './sendEmail'
import { UserType } from '@aws-sdk/client-cognito-identity-provider'

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

const getUserEmail = (user: UserType): string | undefined => {
  return user.Attributes?.find((attr) => attr.Name === 'email')?.Value
}

export const handler: EventBridgeHandler<
  'Scheduled Event',
  null,
  void
> = async () => {
  // Get all users via listUserStats
  const { data: userStats } = await client.graphql({
    query: listUserStats,
  })

  const allUsers = await listAllCognitoUsers()
  const userIdEmailMap = new Map<string, string>()

  allUsers?.Users?.forEach((user) => {
    const email = getUserEmail(user)

    if (user.Username && email) {
      userIdEmailMap.set(user.Username, email)
    }
  })

  console.log('allUsers', allUsers.Users)

  for (const userStat of userStats.listUserStats.items) {
    // Checking for fasle because undefined is a valid value
    if (userStat.isSubscribed === false) {
      continue
    }

    console.log('user is subscribed', userStat.id)

    let userTests
    try {
      const { data: foundUserTests } = await client.graphql({
        query: listUserTests,
        variables: {
          filter: {
            userId: {
              eq: userStat.id,
            },
          },
        },
      })

      userTests = foundUserTests
    } catch (error) {
      console.log(JSON.stringify(error, null, 2))
    }

    if (!userTests) {
      continue
    }
    console.log('userTests found')

    const orderedUserTests = userTests.listUserTests.items.sort((a, b) => {
      if (!a.createdAt) return 1 // Treat null as older
      if (!b.createdAt) return -1
      return (
        new Date(b.createdAt).getMilliseconds() -
        new Date(a.createdAt).getMilliseconds()
      )
    })

    console.log('userTests ordered')

    if (orderedUserTests.length !== 0) {
      const mostRecentTest = orderedUserTests[0]
      const isMostRecentTestToday = (() => {
        const today = new Date()
        const mostRecentDate = new Date(mostRecentTest.createdAt)
        return (
          mostRecentDate.getFullYear() === today.getFullYear() &&
          mostRecentDate.getMonth() === today.getMonth() &&
          mostRecentDate.getDate() === today.getDate()
        )
      })()

      if (isMostRecentTestToday) {
        return
      }
    }

    // At this point send the email
    if (!userIdEmailMap.has(userStat.id)) {
      continue
    } else {
      console.log('in else statement')
      const recipientEmail = userIdEmailMap.get(userStat.id) as string

      try {
        console.log('Sending email to', recipientEmail)
        await sendEmail({ recipientEmail })
        console.log('Successfully sent email to', recipientEmail)
      } catch (error) {
        console.error(`Error sending email to ${recipientEmail}: ${error}`)
        throw new Error(`Failed to send email to ${recipientEmail}`, {
          cause: error,
        })
      }
    }
  }
}
