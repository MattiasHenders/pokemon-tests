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
import { useEffect, useState } from 'react'

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
  const { gameType, setGameOverModalOpen } = useGameTypeStore()
  const { user } = useAuthenticator()
  const router = useRouter()

  const [buttonText, setButtonText] = useState('Submit')

  useEffect(() => {
    // If not displaying the answer
    if (!displayAnswer) {
      setButtonText('Lock In')
      return
    }

    // If the guess is invalid
    if (invalidGuess) {
      if (gameType === GameType.UNLIMITED) {
        setButtonText('Reset Game')
      } else {
        setButtonText('Play Unlimited')
        setTimeout(() => setGameOverModalOpen(true), 2000)
      }
      return
    }

    // If the guess
    if (!isEqualPokemon && currentQuestion?.difficulty !== 'impossible') {
      setButtonText('Next Question')
      return
    }

    if (gameType === GameType.UNLIMITED) {
      setButtonText('Reset Game')
    } else {
      setButtonText('Play Unlimited')
      setTimeout(() => setGameOverModalOpen(true), 2000)
    }
  }, [displayAnswer, invalidGuess, isEqualPokemon, currentQuestion])

  if (!currentQuestion) {
    return <></>
  }

  const handleClick = async () => {
    // First check if the answer is already displayed
    if (displayAnswer) {
      // Check if we will not be going to the next question
      if (
        invalidGuess ||
        isEqualPokemon ||
        currentQuestion?.difficulty === 'impossible'
      ) {
        // Check if we should reset the game or offer unlimited game mode
        if (gameType === GameType.UNLIMITED) {
          window.location.reload()
        } else {
          router.push('/unlimited')
        }
      } else {
        nextQuestion()
        return
      }
    }

    // We are checking a result
    checkResult()
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

  const checkResult = () => {
    const invalidGuess = !currentQuestion.validPokemon?.includes(
      selectedPokemon?.name as string
    )

    const isEqualPokemon =
      currentQuestion.pokemonToGuess === selectedPokemon?.name

    // Submit Results if the user is logged in
    if (
      user &&
      gameType === GameType.DAILY_PUZZLE &&
      currentQuestion.difficulty
    ) {
      handleSubmitUserAnswer(
        isEqualPokemon,
        invalidGuess,
        currentQuestion.difficulty
      )
    }

    setDisplayAnswer(true)

    // Check if the answer is invalid
    if (invalidGuess) {
      setInvalidGuess(true)
      return
    }

    // Check if the answer is equal, and therefore a fail
    if (isEqualPokemon) {
      setIsEqualPokemon(true)
      return
    }
  }

  const calculatePoints = (
    isEqualPokemon: boolean,
    invalidGuess: boolean,
    difficulty: 'easy' | 'medium' | 'hard' | 'impossible' | 'error'
  ): number => {
    // Invalid guess: no points
    if (invalidGuess)
      return {
        easy: 0,
        medium: 10,
        hard: 30,
        impossible: 70,
        error: 0,
      }[difficulty]

    // Equal Pokemon: small consolation points
    if (isEqualPokemon)
      return {
        easy: 5,
        medium: 20,
        hard: 50,
        impossible: 110,
        error: 0,
      }[difficulty]

    // Success based on difficulty point calculation
    return {
      easy: 10,
      medium: 30,
      hard: 70,
      impossible: 150,
      error: 0,
    }[difficulty]
  }

  const handleSubmitUserAnswer = async (
    isEqualPokemon: boolean,
    invalidGuess: boolean,
    difficulty: 'easy' | 'medium' | 'hard' | 'impossible' | 'error'
  ) => {
    const points = calculatePoints(isEqualPokemon, invalidGuess, difficulty)
    switch (currentQuestion.difficulty) {
      case 'easy':
        await upsertUserTest({
          testId: pokemonQuestions?.id as string,
          easyAnswer: selectedPokemon?.name as string,
          points,
        })
        break
      case 'medium':
        await upsertUserTest({
          testId: pokemonQuestions?.id as string,
          mediumAnswer: selectedPokemon?.name as string,
          points,
        })
        break
      case 'hard':
        await upsertUserTest({
          testId: pokemonQuestions?.id as string,
          hardAnswer: selectedPokemon?.name as string,
          points,
        })
        break
      case 'impossible':
        await upsertUserTest({
          testId: pokemonQuestions?.id as string,
          impossibleAnswer: selectedPokemon?.name as string,
          points,
        })
        break
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
          {buttonText}
        </StyledButton>
      </Box>
    </>
  )
}
