import { v4 as uuidv4 } from 'uuid'
import type { Handler } from 'aws-lambda'
import { getValidPokemonQuestions } from '../../../../services/getPokemonQuestion'
import { generateClient } from 'aws-amplify/api'
import { Schema } from '../../../data/resource'
import { Amplify } from 'aws-amplify'
import outputs from '../../../../amplify_outputs.json'

Amplify.configure(outputs, { ssr: true })
const client = generateClient<Schema>()

export const handler: Handler = async (event, context) => {
  const qBundle = getValidPokemonQuestions()

  const dailyTest = {
    id: uuidv4(),
    easyQuestion: qBundle.easy,
    mediumQuestion: qBundle.medium,
    hardQuestion: qBundle.hard,
    impossibleQuestion: qBundle.impossible,
  }

  await client.models.DailyTest.create(dailyTest)

  return dailyTest.id
}
