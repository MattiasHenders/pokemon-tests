import type { PostConfirmationTriggerHandler } from 'aws-lambda'
import { type Schema } from '../../data/resource'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data'
import { env } from '$amplify/env/post-confirmation'
import {
  createUserAcheivements,
  createUserStats,
} from '../../graphql/mutations'
import allAchievements from '../../../src/data/achievements'

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
        clearCredentialsAndIdentityId: () => {
          /* noop */
        },
      },
    },
  }
)

const client = generateClient<Schema>()

export const handler: PostConfirmationTriggerHandler = async (event) => {
  // Create user stats
  await client.graphql({
    query: createUserStats,
    variables: {
      input: {
        id: event.userName,
        points: 0,
        pokemonCaught: [],
      },
    },
  })

  // Create user achievements
  for (const acheivement of allAchievements) {
    await client.graphql({
      query: createUserAcheivements,
      variables: {
        input: {
          userId: event.userName,
          acheivementId: acheivement.id,
          completed: false,
          progress: 0,
          total: acheivement.total,
        },
      },
    })
  }

  return event
}
