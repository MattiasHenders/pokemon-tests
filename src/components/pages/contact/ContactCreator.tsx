import { palette } from '@/styles/palette'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { Box, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import StyledButton from '../../common/StyledButton'
import { useState } from 'react'

import { generateClient } from 'aws-amplify/api'
import { Schema } from '@/amplify/data/resource'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'
import { useSnackbar } from 'notistack'

Amplify.configure(outputs)
const client = generateClient<Schema>()

export default () => {
  const [feedback, setFeedback] = useState('')
  const { user } = useAuthenticator()
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmitFeedback = async () => {
    try {
      await client.models.UserFeedback.create({ feedback })

      enqueueSnackbar('Feedback submitted', { variant: 'success' })
      setFeedback('')
    } catch (error) {
      enqueueSnackbar('Error submitting feedback', { variant: 'error' })
      console.error('Error submitting feedback:', error)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: palette.primary.lightText,
          textAlign: 'center',
          fontSize: { xs: 22, sm: 26, md: 28 },
        }}
      >
        Contact The Creator
      </Typography>
      {user ? (
        <>
          <Typography
            variant="body1"
            sx={{ color: palette.primary.lightText, textAlign: 'center' }}
          >
            I want to hear any and all ideas! Please message me DIRECTLY below
          </Typography>
          <TextField
            label="Feedback"
            multiline
            maxRows={4}
            variant="filled"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{
              width: { xs: '95%', md: '100%' },
              backgroundColor: palette.background.light,
              color: palette.primary.darkText,
            }}
          />
          <StyledButton onClick={handleSubmitFeedback}>Submit</StyledButton>
        </>
      ) : (
        <Typography
          variant="body1"
          sx={{ color: palette.primary.lightText, textAlign: 'center' }}
        >
          You must be logged in to contact us.
        </Typography>
      )}
    </Box>
  )
}
