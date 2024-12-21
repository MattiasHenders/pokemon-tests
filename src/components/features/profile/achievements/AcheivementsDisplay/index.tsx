import { Schema } from '@/amplify/data/resource'
import { Box, CircularProgress, Grid2 as Grid } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'
import { useEffect, useState } from 'react'
import outputs from '@/amplify_outputs.json'
import { palette } from '@/styles/palette'
import SingleAchievementDisplay from './SingleAchievementDisplay'

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
          await client.models.UserAcheivements.list()

        if (errors) {
          throw new Error(errors[0].message)
        }

        const sortedAcheivements = userAcheivements.sort((a, b) => {
          if (!a.acheivementId || !b.acheivementId) return 0

          return a.acheivementId.localeCompare(b.acheivementId)
        })

        setUserAcheivements(sortedAcheivements)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserAcheivements()
  }, [])

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          my: 10,
        }}
      >
        <CircularProgress size={42} sx={{ color: palette.primary.lightText }} />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        mb: 5,
        px: 3,
      }}
    >
      <Grid
        container
        rowSpacing={{ xs: 3, sm: 2, md: 3 }}
        columnSpacing={{ xs: 3, sm: 2, md: 3 }}
      >
        {userAcheivements.map((acheivement) => (
          <Grid size={{ xs: 12, sm: 4, md: 3 }} key={acheivement.id}>
            <SingleAchievementDisplay
              key={acheivement.id}
              acheivement={acheivement}
              isOnAchievementScreen
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
