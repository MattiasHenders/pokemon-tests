import { Box, Typography } from '@mui/material'
import React from 'react'
import Countdown, { CountdownRendererFn } from 'react-countdown'

const CountdownToMidnight: React.FC = () => {
  // Function to calculate the next UTC midnight
  const getNextUTCMidnight = (): Date => {
    const now = new Date()
    const nextMidnight = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1, // Move to the next day
        0,
        0,
        0,
        0 // Midnight in UTC
      )
    )
    return nextMidnight
  }

  // Custom renderer function for the countdown
  const renderer: CountdownRendererFn = ({
    hours,
    minutes,
    seconds,
    completed,
  }) => {
    if (completed) {
      // Handle what happens when the countdown is complete
      return (
        <Typography variant="h6" sx={{ fontSize: { xs: 16, md: 18 } }}>
          Refresh to Play todays game
        </Typography>
      )
    } else {
      // Format the countdown as HH:mm:ss
      return (
        <Typography variant="h6" sx={{ fontSize: { xs: 16, md: 18 } }}>
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </Typography>
      )
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 1,
        columnGap: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontSize: { xs: 16, md: 18 } }}>
        Next Game In:
      </Typography>
      <Countdown date={getNextUTCMidnight()} renderer={renderer} />
    </Box>
  )
}

export default CountdownToMidnight
