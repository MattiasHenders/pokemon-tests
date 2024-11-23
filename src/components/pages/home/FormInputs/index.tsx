import { Box } from '@mui/material'
import { useInputStore } from '@/src/stores/input'
import { useQuestionStore } from '@/src/stores/question'
import { useAnswerStore } from '@/src/stores/answer'
import ResultsMessage from './ResultsMessage'
import StyledButton from '../../../common/StyledButton'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { upsertUserTest } from '@/requests/UserTests'
import { GameType, useGameTypeStore } from '@/src/stores/game'
import { useRouter } from 'next/router'

export default () => {
  const { pokemonQuestions, currentQuestion, setCurrentQuestion } =
    useQuestionStore()
  const {
    invalidGuess,
    setInvalidGuess,
    isEqualPokemon,
    setIsEqualPokemon,
    displayAnswer,
    setDisplayAnswer,
  } = useAnswerStore()
  const { selectedPokemon, setSelectedPokemon, clearInput } = useInputStore()
  const { gameType } = useGameTypeStore()
  const { user } = useAuthenticator()
  const router = useRouter()

  if (!currentQuestion) {
    return <></>
  }

  const handleClick = async () => {
    if (gameType === GameType.DAILY_PUZZLE && user !== undefined) {
      handleSubmitUserAnswer()
    }

    if (
      isEqualPokemon ||
      invalidGuess ||
      (displayAnswer && currentQuestion.difficulty === 'impossible')
    ) {
      if (gameType === GameType.UNLIMITED) {
        return window.location.reload()
      } else {
        clearInput()
        setSelectedPokemon(null)
        setDisplayAnswer(false)
        setIsEqualPokemon(null)
        return router.push('/unlimited')
      }
    }
    if (!displayAnswer) {
      return calculateResults()
    } else {
      return nextQuestion()
    }
  }

  const calculateResults = () => {
    if (!currentQuestion.validPokemon?.includes(selectedPokemon?.name || '')) {
      setInvalidGuess(true)
      setDisplayAnswer(true)
      return
    }

    if (selectedPokemon?.name === currentQuestion.pokemonToGuess) {
      setIsEqualPokemon(true)
    } else {
      setIsEqualPokemon(false)
    }

    setDisplayAnswer(true)
  }

  const nextQuestion = () => {
    clearInput()
    setSelectedPokemon(null)
    setDisplayAnswer(false)
    setIsEqualPokemon(null)
    switch (currentQuestion.difficulty) {
      case 'easy':
        if (pokemonQuestions?.mediumQuestion)
          setCurrentQuestion(pokemonQuestions?.mediumQuestion)
        break
      case 'medium':
        if (pokemonQuestions?.hardQuestion)
          setCurrentQuestion(pokemonQuestions?.hardQuestion)
        break
      case 'hard':
        if (pokemonQuestions?.impossibleQuestion)
          setCurrentQuestion(pokemonQuestions?.impossibleQuestion)
        break
    }
  }

  const handleSubmitUserAnswer = async () => {
    switch (currentQuestion.difficulty) {
      case 'easy':
        await upsertUserTest({
          testId: pokemonQuestions?.id as string,
          easyAnswer: selectedPokemon?.name as string,
        })
        break
      case 'medium':
        await upsertUserTest({
          testId: pokemonQuestions?.id as string,
          mediumAnswer: selectedPokemon?.name as string,
        })
        break
      case 'hard':
        await upsertUserTest({
          testId: pokemonQuestions?.id as string,
          hardAnswer: selectedPokemon?.name as string,
        })
        break
      case 'impossible':
        await upsertUserTest({
          testId: pokemonQuestions?.id as string,
          impossibleAnswer: selectedPokemon?.name as string,
        })
        break
    }
  }

  const getButtonText = () => {
    if (!displayAnswer) {
      return 'Lock In'
    }
    if (invalidGuess) {
      if (gameType === GameType.UNLIMITED) {
        return 'Reset Game'
      } else {
        return 'Play Unlimited'
      }
    }
    if (!isEqualPokemon && currentQuestion.difficulty !== 'impossible') {
      return 'Next Question'
    } else {
      if (gameType === GameType.UNLIMITED) {
        return 'Reset Game'
      } else {
        return 'Play Unlimited'
      }
    }
  }

  return (
    <>
      <ResultsMessage />
      <Box sx={{ my: 2 }}>
        <StyledButton
          variant="contained"
          disabled={!selectedPokemon}
          size="large"
          onClick={handleClick}
        >
          {getButtonText()}
        </StyledButton>
      </Box>
    </>
  )
}
