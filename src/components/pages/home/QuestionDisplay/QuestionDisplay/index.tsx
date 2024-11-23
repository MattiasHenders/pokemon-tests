import React from 'react'
import { Box, Typography } from '@mui/material'
import { palette } from '@/styles/palette'
import { useQuestionStore } from '@/src/stores/question'

export default () => {
  const { currentQuestion } = useQuestionStore()

  return (
    <Box
      sx={{
        p: { xs: 1, md: 2 },
        borderRadius: 4,
        border: `2px solid ${palette.secondary.dark}`,
        backgroundColor: palette.primary.light,
        maxWidth: { xs: 300, md: 400 },
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '1rem',
          fontWeight: 'bold',
          color: palette.secondary.dark,
        }}
      >
        {currentQuestion ? currentQuestion.question : 'Loading...'}
      </Typography>
    </Box>
  )
}
