import { Schema } from '@/amplify/data/resource'
import { useGameTypeStore, GameType } from '@/src/stores/game'
import { useQuestionStore } from '@/src/stores/question'
import { useEffect } from 'react'
import { generateClient } from 'aws-amplify/api'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'
import { useInputStore } from '@/src/stores/input'
import { Dex } from '@pkmn/dex'
import { useAnswerStore } from '@/src/stores/answer'
import { Nullable } from '@aws-amplify/data-schema'
import { getCurrentUser } from 'aws-amplify/auth'
import posthog from 'posthog-js'

Amplify.configure(outputs)
const client = generateClient<Schema>()

export default ({
  pokemonQuestions,
  gameType,
  children,
}: {
  pokemonQuestions: Schema['DailyTest']['type']
  gameType: GameType
  children: React.ReactNode
}) => {
  const { setPokemonQuestions, setCurrentQuestion } = useQuestionStore()
  const { setGameType, setGameOverModalOpen } = useGameTypeStore()
  const { clearInput, setSelectedPokemon } = useInputStore()
  const { setInvalidGuess, setIsEqualPokemon, setDisplayAnswer } =
    useAnswerStore()

  useEffect(() => {
    setGameOverModalOpen(false)
    setGameType(gameType)
    setPokemonQuestions(pokemonQuestions)

    const startGameOnLoad = async () => {
      try {
        // User is signed in
        await getCurrentUser()
        beginGameLogic()
      } catch (error) {
        // User is not signed in
        if (pokemonQuestions?.easyQuestion)
          setCurrentQuestion(pokemonQuestions?.easyQuestion)
        clearInput()
        setSelectedPokemon(null)
        setDisplayAnswer(false)
        setIsEqualPokemon(null)
        return
      }
    }

    startGameOnLoad()
  }, [])

  const beginGameLogic = async () => {
    // Check what game mode we are in
    if (gameType === GameType.DAILY_PUZZLE) {
      const { data, errors } = await client.models.UserTests.list({
        filter: {
          testId: {
            eq: pokemonQuestions?.id as string,
          },
        },
      })

      // If its a daily test, see if the user has played today
      const userTest = data[0]

      // If the user has not played today, reset the game
      if (!userTest || errors) {
        if (pokemonQuestions?.easyQuestion)
          setCurrentQuestion(pokemonQuestions?.easyQuestion)
        clearInput()
        setSelectedPokemon(null)
        setDisplayAnswer(false)
        setIsEqualPokemon(null)
        posthog.capture('game_started', {
          gameType: 'daily',
          previousDifficulty: 'none',
        })
        return
      }

      // The user has played today, set the game to the furthest question they answered
      const currentQuestionDifficulty = getFurthestQuestionDifficulty(userTest)
      switch (currentQuestionDifficulty) {
        case 'easy':
          if (pokemonQuestions?.easyQuestion)
            setGameToPreviousLevel(
              userTest.easyAnswer,
              pokemonQuestions.easyQuestion
            )
          break
        case 'medium':
          if (pokemonQuestions?.mediumQuestion)
            setGameToPreviousLevel(
              userTest.mediumAnswer,
              pokemonQuestions.mediumQuestion
            )
          break
        case 'hard':
          if (pokemonQuestions?.hardQuestion)
            setGameToPreviousLevel(
              userTest.hardAnswer,
              pokemonQuestions.hardQuestion
            )
          break
        case 'impossible':
          if (pokemonQuestions?.impossibleQuestion)
            setGameToPreviousLevel(
              userTest.impossibleAnswer,
              pokemonQuestions.impossibleQuestion
            )
          break
      }

      posthog.capture('game_started', {
        gameType: 'daily',
        previousDifficulty: currentQuestionDifficulty,
      })
    }
    // If the game type is unlimited, set it to the easy question
    else {
      clearInput()
      if (pokemonQuestions?.easyQuestion) {
        setCurrentQuestion(pokemonQuestions?.easyQuestion)
      }
      setSelectedPokemon(null)
      setDisplayAnswer(false)
      setIsEqualPokemon(null)

      posthog.capture('game_started', {
        gameType: 'unlimited',
        previousDifficulty: 'none',
      })
    }
  }

  const setGameToPreviousLevel = (
    usersAnswer: Nullable<string>,
    question: Schema['PokemonQuestion']['type']
  ) => {
    setCurrentQuestion(question)
    if (usersAnswer) {
      setSelectedPokemon(Dex.species.get(usersAnswer))
      setDisplayAnswer(true)
      if (!question?.validPokemon?.includes(usersAnswer)) {
        setInvalidGuess(true)
        return
      }
      if (usersAnswer === question.pokemonToGuess) {
        setIsEqualPokemon(true)
      } else {
        setIsEqualPokemon(false)
      }
    }
  }

  const getFurthestQuestionDifficulty = (
    userTest: Schema['UserTests']['type']
  ) => {
    if (userTest.impossibleAnswer) return 'impossible'
    if (userTest.hardAnswer) return 'hard'
    if (userTest.mediumAnswer) return 'medium'
    if (userTest.easyAnswer) return 'easy'
    else return 'error'
  }

  return children
}
