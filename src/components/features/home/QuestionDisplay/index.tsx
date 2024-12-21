import React from 'react'
import { Box } from '@mui/material'
import DifficultyDisplay from './DifficultyDisplay'
import QuestionDisplay from './QuestionDisplay'

export default () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        my: 2,
      }}
    >
      <DifficultyDisplay />
      <QuestionDisplay />
    </Box>
  )
}
