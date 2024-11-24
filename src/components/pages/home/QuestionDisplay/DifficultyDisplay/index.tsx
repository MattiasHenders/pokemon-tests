import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'
import { palette } from '@/styles/palette'
import { useQuestionStore } from '@/src/stores/question'

export default () => {
  const { currentQuestion } = useQuestionStore()
  const [questionDifficulty, setQuestionDifficulty] = useState('Loading')
  const [questionIcon, setQuestionIcon] = useState('/img/balls/premier.webp')

  useEffect(() => {
    switch (currentQuestion?.difficulty) {
      case 'easy':
        setQuestionDifficulty('Easy')
        setQuestionIcon('/img/balls/poke.webp')
        break
      case 'medium':
        setQuestionDifficulty('Medium')
        setQuestionIcon('/img/balls/great.webp')
        break
      case 'hard':
        setQuestionDifficulty('Hard')
        setQuestionIcon('/img/balls/ultra.webp')
        break
      case 'impossible':
        setQuestionDifficulty('Impossible')
        setQuestionIcon('/img/balls/master.webp')
        break
      default:
        setQuestionDifficulty('Loading')
        setQuestionIcon('/img/balls/premier.webp')
        break
    }
  }, [currentQuestion?.difficulty])

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
        {questionDifficulty} Level
      </Typography>
      <Image src={questionIcon} width={50} height={50} alt={'question'} />
    </Box>
  )
}
