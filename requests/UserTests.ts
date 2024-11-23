import { v4 as uuidv4 } from 'uuid'
import { generateClient } from 'aws-amplify/api'
import { Schema } from '@/amplify/data/resource'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'

Amplify.configure(outputs, { ssr: true })
const client = generateClient<Schema>()

export const upsertUserTest = async (upsertUserTest: {
  testId: string
  easyAnswer?: string
  mediumAnswer?: string
  hardAnswer?: string
  impossibleAnswer?: string
}) => {
  if (!upsertUserTest.testId) {
    throw new Error('testId is required')
  }

  const { data, errors } = await client.models.UserTests.list({
    filter: {
      testId: {
        eq: upsertUserTest.testId,
      },
    },
  })

  if (errors) {
    throw new Error(errors[0].message)
  }

  if (data.length > 0) {
    return await client.models.UserTests.update({
      id: data[0].id,
      ...upsertUserTest,
    })
  } else {
    return await client.models.UserTests.create({
      id: uuidv4(),
      ...upsertUserTest,
    })
  }
}
