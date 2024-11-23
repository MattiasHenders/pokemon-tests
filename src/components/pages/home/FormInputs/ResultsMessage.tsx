import { Typography, Box } from '@mui/material'
import { useInputStore } from '@/src/stores/input'
import { useQuestionStore } from '@/src/stores/question'
import { useAnswerStore } from '@/src/stores/answer'
import { palette } from '@/styles/palette'

export default () => {
  const { currentQuestion } = useQuestionStore()
  const { invalidGuess, isEqualPokemon, displayAnswer } = useAnswerStore()

  if (!currentQuestion) {
    return <></>
  }

  const getResultsText = () => {
    if (!displayAnswer) return undefined
    if (invalidGuess) {
      return 'You guessed an invalid pokemon'
    }
    if (isEqualPokemon) {
      return 'Unfortunately, you guessed the same pokemon'
    } else {
      return 'You guessed a safe pokemon'
    }
  }

  const getResultsTextColour = () => {
    if (isEqualPokemon || invalidGuess) {
      return palette.error.dark
    } else {
      return palette.primary.dark
    }
  }

  const getResultsBackgroundColor = () => {
    if (isEqualPokemon || invalidGuess) {
      return palette.error.light
    } else {
      return palette.primary.light
    }
  }

  return (
    <>
      {getResultsText() && (
        <Box
          sx={{
            mt: 1,
            p: 1,
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: getResultsBackgroundColor(),
            border: `3px solid ${getResultsTextColour()}`,
            borderRadius: 3,
          }}
        >
          <Typography
            sx={{ color: getResultsTextColour(), fontSize: '1.25rem' }}
          >
            {getResultsText()}
          </Typography>
        </Box>
      )}
    </>
  )
}
