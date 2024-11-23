import { GuessPokemonQuestion } from '../../models/questions'
import PokemonQuestions from './data'
import { getAllValidPokemon } from '../getAllValidPokemon'

export type PokemonQuestionBundle = {
  easy: PokemonQuestion
  medium: PokemonQuestion
  hard: PokemonQuestion
  impossible: PokemonQuestion
}

export type PokemonQuestion = {
  pokemonToGuess: string
  question: string
  difficulty: 'easy' | 'medium' | 'hard' | 'impossible' | 'error'
  validPokemon: string[]
}

const getPokemonQuestion = (): PokemonQuestion => {
  // All pokemon
  const allPokemon = getAllValidPokemon()

  // Randomly select a pokemon to mimic a guess
  const pokemonToGuess =
    allPokemon[Math.floor(Math.random() * allPokemon.length)]

  // Make a question
  const bank = PokemonQuestions

  // Shuffle the bank
  const guessPokemonQuestionMap: GuessPokemonQuestion[] = []
  const shuffledBank = bank.sort(() => Math.random() - 0.5)

  // Get 1 to 2 questions
  const questions = Math.floor(Math.random() * 2) + 1

  for (let i = 0; i < questions; i++) {
    const question = shuffledBank[i]
    guessPokemonQuestionMap.push(new question(pokemonToGuess))
  }

  // Check all other pokemon that fit that role
  let validPokemon: string[] = []
  allPokemon.forEach((pokemon) => {
    const isValid = guessPokemonQuestionMap.every((guessQuestion) => {
      return guessQuestion.guessChecker(pokemon)
    })

    if (isValid) {
      validPokemon.push(pokemon.name)
    }
  })

  let question = 'Guess a Pokémon'
  guessPokemonQuestionMap.forEach((guessQuestion, i) => {
    if (i === 0) {
      question += ` ${guessQuestion.getQuestion()}`
    } else {
      question += ` and ${guessQuestion.getQuestion()}`
    }
  })

  // Assign difficulty
  const difficulty = getDifficulty(validPokemon.length)

  return {
    question,
    validPokemon,
    difficulty,
    pokemonToGuess: pokemonToGuess.name,
  }
}

const getDifficulty = (
  validPokemon: number
): 'easy' | 'medium' | 'hard' | 'impossible' | 'error' => {
  if (validPokemon < 2 || validPokemon > 100) {
    return 'error'
  } else if (validPokemon <= 5) {
    return 'impossible'
  } else if (validPokemon <= 15) {
    return 'hard'
  } else if (validPokemon <= 30) {
    return 'medium'
  } else {
    return 'easy'
  }
}

const getValidPokemonQuestions = (): PokemonQuestionBundle => {
  let easy = getPokemonQuestion()
  while (easy.difficulty !== 'easy') {
    easy = getPokemonQuestion()
  }
  let medium = getPokemonQuestion()
  while (medium.difficulty !== 'medium') {
    medium = getPokemonQuestion()
  }
  let hard = getPokemonQuestion()
  while (hard.difficulty !== 'hard') {
    hard = getPokemonQuestion()
  }
  let impossible = getPokemonQuestion()
  while (impossible.difficulty !== 'impossible') {
    impossible = getPokemonQuestion()
  }

  return {
    easy,
    medium,
    hard,
    impossible,
  }
}

export default getValidPokemonQuestions
