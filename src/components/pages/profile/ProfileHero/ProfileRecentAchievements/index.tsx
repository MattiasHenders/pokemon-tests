import { Box } from '@mui/material'
import { generateClient } from 'aws-amplify/api'
import { Schema } from '@/amplify/data/resource'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'
import { useEffect, useState } from 'react'
import EmptyAcheivements from './EmptyAcheivements'
import LoadingAchievements from './LoadingAchievements'
import SingleAcheievement from './SingleAcheievement'

Amplify.configure(outputs)
const client = generateClient<Schema>()

export default () => {
  const [userAcheivements, setUserAcheivements] = useState<
    Schema['UserAcheivements']['type'][]
  >([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const fetchUserAcheivements = async () => {
      try {
        const { data: userAcheivements, errors } =
          await client.models.UserAcheivements.list({
            limit: 2,
          })

        if (errors) {
          throw new Error(errors[0].message)
        }

        setUserAcheivements(userAcheivements)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserAcheivements()
  }, [])

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {isLoading ? (
        <LoadingAchievements />
      ) : userAcheivements.length === 0 ? (
        <EmptyAcheivements />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          {userAcheivements.map((userAcheivement) => (
            <SingleAcheievement
              key={userAcheivement.id}
              acheivement={userAcheivement}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}
