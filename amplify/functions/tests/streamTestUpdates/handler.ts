import { v4 as uuidv4 } from 'uuid'
import type { DynamoDBStreamHandler, EventBridgeHandler } from 'aws-lambda'
import { getValidPokemonQuestions } from '../../../../services/getPokemonQuestion'
import { generateClient } from 'aws-amplify/api'
import { Schema } from '../../../data/resource'
import { Amplify } from 'aws-amplify'
import { createDailyTest, updateUserStats } from '../../../graphql/mutations'
import { PokemonQuestionDifficulty } from '../../../graphql/API'
import { env } from '$amplify/env/generate-daily-puzzle'

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
  const getPokemonToAdd = (dailyTest: any) => {
    const pokemonToAdd = []
    if (dailyTest['easyAnswer']?.S) {
      pokemonToAdd.push(dailyTest['easyAnswer']?.S)
    }
    if (dailyTest['mediumAnswer']?.S) {
      pokemonToAdd.push(dailyTest['mediumAnswer']?.S)
    }
    if (dailyTest['hardAnswer']?.S) {
      pokemonToAdd.push(dailyTest['hardAnswer']?.S)
    }
    if (dailyTest['impossibleAnswer']?.S) {
      pokemonToAdd.push(dailyTest['impossibleAnswer']?.S)
    }
    return pokemonToAdd
  }

  for (const record of event.Records) {
    if (record.eventName === 'INSERT' || record.eventName === 'MODIFY') {
      // Get the new daily test
      const dailyTest = record.dynamodb?.NewImage
      if (!dailyTest) continue

      // Get the details to add into the User Stats
      const userId = dailyTest['userId']
      if (!userId || !userId?.S) continue

      // Get the previous stats
      const { data: previousUserStats } = await client.models.UserStats.get({
        id: userId.S,
      })

      // Calculate points
      if (!dailyTest['points']?.N) continue
      const points =
        previousUserStats?.points ?? 0 + parseInt(dailyTest['points'].N) ?? 0

      // Calculate pokemon caught
      const pokemonToAdd = getPokemonToAdd(dailyTest)
      const pokemonCaught = new Set(
        previousUserStats?.pokemonCaught
          ?.map((p) => p?.toString())
          .filter((p) => p !== undefined) ?? []
      )

      // Add pokemon
      for (const pokemon of pokemonToAdd) {
        if (pokemonCaught.has(pokemon)) continue
        pokemonCaught.add(pokemon)
      }

      // Update User Stats
      await client.graphql({
        query: updateUserStats,
        variables: {
          input: {
            id: userId.S,
            points,
            pokemonCaught: Array.from(pokemonCaught),
          },
        },
      })
    }
  }
}
