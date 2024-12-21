import { Box, Button } from '@mui/material'
import { generateClient } from 'aws-amplify/api'
import { Schema } from '@/amplify/data/resource'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'
import { useEffect, useState } from 'react'
import EmptyAcheivements from './EmptyAcheivements'
import LoadingAchievements from './LoadingAchievements'
import SingleAcheievement from '../../../achievements/AcheivementsDisplay/SingleAchievementDisplay'
import Link from 'next/link'
import { palette } from '@/styles/palette'

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
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        rowGap: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
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
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link href={'/profile/achievements'}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: palette.secondary.main,
              '&:hover': {
                backgroundColor: palette.secondary.light,
                color: palette.secondary.dark,
              },
              color: palette.primary.lightText,
              fontWeight: 'bold',
            }}
          >
            View all acheivements
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
