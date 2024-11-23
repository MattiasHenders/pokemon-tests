import { Schema } from '@/amplify/data/resource'
import { useGameTypeStore, GameType } from '@/src/stores/game'
import { useQuestionStore } from '@/src/stores/question'
import { useEffect } from 'react'
import { generateClient } from 'aws-amplify/api'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'
import { useInputStore } from '@/src/stores/input'
import { Dex, Species } from '@pkmn/dex'
import { useAnswerStore } from '@/src/stores/answer'

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
  const { currentQuestion, setPokemonQuestions, setCurrentQuestion } =
    useQuestionStore()
  const { setGameType } = useGameTypeStore()
  const { clearInput, setSelectedPokemon } = useInputStore()
  const { setInvalidGuess, setIsEqualPokemon, setDisplayAnswer } =
    useAnswerStore()

  useEffect(() => {
    setGameType(gameType)
  }, [])

  useEffect(() => {
    clearInput()
    setSelectedPokemon(null)
    setDisplayAnswer(false)
    setIsEqualPokemon(null)
  }, [gameType])

  useEffect(() => {
    setPokemonQuestions(pokemonQuestions)
    if (pokemonQuestions?.easyQuestion)
      setCurrentQuestion(pokemonQuestions?.easyQuestion)
  }, [pokemonQuestions, setCurrentQuestion])

  useEffect(() => {
    const getData = async () => {
      if (gameType === GameType.DAILY_PUZZLE) {
        const { data, errors } = await client.models.UserTests.list({
          filter: {
            testId: {
              eq: pokemonQuestions?.id as string,
            },
          },
        })

        const userTest = data[0]

        switch (currentQuestion?.difficulty) {
          case 'easy':
            if (userTest?.easyAnswer) {
              console.log(userTest?.easyAnswer)
              setSelectedPokemon(Dex.species.get(userTest?.easyAnswer))
              setDisplayAnswer(true)
              if (
                !currentQuestion.validPokemon?.includes(userTest?.easyAnswer)
              ) {
                console.log('invalid guess', currentQuestion.validPokemon)
                setInvalidGuess(true)
                break
              }
              if (userTest?.easyAnswer === currentQuestion.pokemonToGuess) {
                console.log('equal pokemon', currentQuestion.validPokemon)
                setIsEqualPokemon(true)
              } else {
                console.log('not equal pokemon', currentQuestion.validPokemon)
                setIsEqualPokemon(false)
              }
            }
            break
          case 'medium':
            if (userTest?.mediumAnswer) {
              setSelectedPokemon(Dex.species.get(userTest?.mediumAnswer))
              setDisplayAnswer(true)
              if (
                !currentQuestion.validPokemon?.includes(userTest?.mediumAnswer)
              ) {
                setInvalidGuess(true)
                break
              }
              if (userTest?.mediumAnswer === currentQuestion.pokemonToGuess) {
                setIsEqualPokemon(true)
              } else {
                setIsEqualPokemon(false)
              }
            }
            break
          case 'hard':
            if (userTest?.hardAnswer) {
              setSelectedPokemon(Dex.species.get(userTest?.hardAnswer))
              setDisplayAnswer(true)
              if (
                !currentQuestion.validPokemon?.includes(userTest?.hardAnswer)
              ) {
                setInvalidGuess(true)
                break
              }
              if (userTest?.hardAnswer === currentQuestion.pokemonToGuess) {
                setIsEqualPokemon(true)
              } else {
                setIsEqualPokemon(false)
              }
            }
            break
          case 'impossible':
            if (userTest?.impossibleAnswer) {
              setSelectedPokemon(Dex.species.get(userTest?.impossibleAnswer))
              setDisplayAnswer(true)
              if (
                !currentQuestion.validPokemon?.includes(
                  userTest?.impossibleAnswer
                )
              ) {
                setInvalidGuess(true)
                break
              }
              if (
                userTest?.impossibleAnswer === currentQuestion.pokemonToGuess
              ) {
                setIsEqualPokemon(true)
              } else {
                setIsEqualPokemon(false)
              }
            }
            break
        }
      }
    }

    getData()
  }, [currentQuestion])

  return children
}
