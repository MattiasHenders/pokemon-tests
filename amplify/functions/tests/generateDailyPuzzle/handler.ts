import { v4 as uuidv4 } from 'uuid'
import type { EventBridgeHandler } from 'aws-lambda'
import { getValidPokemonQuestions } from '../../../../services/getPokemonQuestion'
import { generateClient } from 'aws-amplify/api'
import { Schema } from '../../../data/resource'
import { Amplify } from 'aws-amplify'
import { createDailyTest } from '../../../graphql/mutations'
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

export const handler: EventBridgeHandler<
  'Scheduled Event',
  null,
  void
> = async (event) => {
  const qBundle = getValidPokemonQuestions()

  const dailyTest = {
    id: uuidv4(),
    easyQuestion: qBundle.easy,
    mediumQuestion: qBundle.medium,
    hardQuestion: qBundle.hard,
    impossibleQuestion: qBundle.impossible,
  }

  await client.graphql({
    query: createDailyTest,
    variables: {
      input: {
        id: dailyTest.id,
        easyQuestion: {
          ...dailyTest.easyQuestion,
          difficulty: dailyTest.easyQuestion
            .difficulty as PokemonQuestionDifficulty,
        },
        mediumQuestion: {
          ...dailyTest.mediumQuestion,
          difficulty: dailyTest.mediumQuestion
            .difficulty as PokemonQuestionDifficulty,
        },
        hardQuestion: {
          ...dailyTest.hardQuestion,
          difficulty: dailyTest.hardQuestion
            .difficulty as PokemonQuestionDifficulty,
        },
        impossibleQuestion: {
          ...dailyTest.impossibleQuestion,
          difficulty: dailyTest.impossibleQuestion
            .difficulty as PokemonQuestionDifficulty,
        },
      },
    },
  })
}
