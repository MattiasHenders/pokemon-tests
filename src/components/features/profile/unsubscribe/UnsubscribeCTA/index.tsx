import {
  alpha,
  Box,
  CircularProgress,
  Paper,
  Switch,
  Typography,
} from '@mui/material'
import { palette } from '@/styles/palette'
import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/api'
import { Schema } from '@/amplify/data/resource'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'
import { useSnackbar } from 'notistack'
import { useAuthenticator } from '@aws-amplify/ui-react'

Amplify.configure(outputs)
const client = generateClient<Schema>()

export default () => {
  const { user } = useAuthenticator()
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    const getUserStats = async () => {
      const { data: userStats, errors } = await client.models.UserStats.get({
        id: user.userId,
      })

      if (!errors) {
        if (userStats?.isSubscribed !== isSubscribed) {
          setIsSubscribed(!!userStats?.isSubscribed)
        }
      }
      setIsLoading(false)
    }

    getUserStats()
  }, [])

  useEffect(() => {
    const updateUserStats = async () => {
      try {
        const { data: userStats, errors } = await client.models.UserStats.get({
          id: user.userId,
        })

        if (errors) {
          return
        }

        if (userStats?.isSubscribed === isSubscribed) {
          return
        }

        await client.models.UserStats.update({
          id: user.userId,
          isSubscribed,
        })

        enqueueSnackbar(
          `Successfully ${isSubscribed ? 'subscribed to email notifications' : 'unsubscribed from email notifications'}`,
          {
            variant: 'success',
          }
        )
      } catch (error) {
        console.log(error)
        enqueueSnackbar(
          `Error ${isSubscribed ? 'subscribing to email notifications' : 'unsubscribing from email notifications'}`,
          { variant: 'error' }
        )
      }
    }

    if (isLoading) return
    updateUserStats()
  }, [isLoading, isSubscribed])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubscribed(event.target.checked)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '50vh',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        mb: 5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{ color: palette.primary.lightText, fontSize: 22, mb: 4 }}
        >
          Unsubscribe from PokeTest emails? You can always re-subscribe by
          coming back to this page.
        </Typography>
        {isLoading ? (
          <CircularProgress
            size={42}
            sx={{ color: alpha(palette.primary.lightText, 0.5) }}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{ color: palette.primary.lightText, fontSize: 16, mr: 3 }}
            >
              {isSubscribed
                ? 'Subscribed to email notifications'
                : 'Not subscribed to email notifications'}
            </Typography>
            <Paper
              sx={{
                p: 1,
                borderRadius: 4,
                backgroundColor: palette.secondary.light,
              }}
              elevation={3}
            >
              <Switch
                color="success"
                checked={isSubscribed}
                onChange={handleChange}
              />
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  )
}
