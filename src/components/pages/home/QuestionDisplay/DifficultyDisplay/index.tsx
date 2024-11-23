import React from 'react'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'
import { palette } from '@/styles/palette'
import { useQuestionStore } from '@/src/stores/question'

export default () => {
  const { currentQuestion } = useQuestionStore()

  const formatQuestionDifficulty = () => {
    switch (currentQuestion?.difficulty) {
      case 'easy':
        return 'Easy'
      case 'medium':
        return 'Medium'
      case 'hard':
        return 'Hard'
      case 'impossible':
        return 'Impossible'
      default:
        return 'Loading'
    }
  }

  const getQuestionIcon = () => {
    switch (currentQuestion?.difficulty) {
      case 'easy':
        return '/img/balls/poke.webp'
      case 'medium':
        return '/img/balls/great.webp'
      case 'hard':
        return '/img/balls/ultra.webp'
      case 'impossible':
        return '/img/balls/master.webp'
      default:
        return '/img/balls/premier.webp'
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: '2rem',
          fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          WebkitTextStroke: `1.5px ${palette.poke.blue}`,
          color: palette.poke.yellow,
        }}
      >
        {formatQuestionDifficulty()} Level
      </Typography>
      <Image
        src={getQuestionIcon() || ''}
        width={50}
        height={50}
        alt={'question'}
      />
    </Box>
  )
}
