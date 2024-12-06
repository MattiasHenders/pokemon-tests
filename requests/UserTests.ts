import { v4 as uuidv4 } from 'uuid'
import { generateClient } from 'aws-amplify/api'
import { Schema } from '@/amplify/data/resource'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'
import { enqueueSnackbar } from 'notistack'
import { getCurrentUser } from 'aws-amplify/auth'

Amplify.configure(outputs, { ssr: true })
const client = generateClient<Schema>()

export const upsertUserTest = async (upsertUserTest: {
  testId: string
  easyAnswer?: string
  mediumAnswer?: string
  hardAnswer?: string
  impossibleAnswer?: string
  points: number
}) => {
  if (!upsertUserTest.testId) {
    throw new Error('testId is required')
  }

  const user = await getCurrentUser()

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

  const { data: dailyTest, errors: dailyTestErrors } =
    await client.models.DailyTest.get({ id: upsertUserTest.testId })

  if (dailyTestErrors) {
    throw new Error(dailyTestErrors[0].message)
  }

  // Check if the test being update is for the current day in UTC
  if (
    dailyTest?.createdAt.split('T')[0] !==
    new Date().toISOString().split('T')[0]
  ) {
    enqueueSnackbar(
      'Test is not for the current day, please refresh the page',
      { variant: 'error' }
    )
    throw new Error('Test is not for the current day')
  }

  if (data.length > 0) {
    return await client.models.UserTests.update({
      id: data[0].id,
      ...upsertUserTest,
      userId: user.username,
    })
  } else {
    return await client.models.UserTests.create({
      id: uuidv4(),
      ...upsertUserTest,
      userId: user.username,
    })
  }
}
