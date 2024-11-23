import { create } from 'zustand'
import type { Schema } from '@/amplify/data/resource'

interface QuestionStoreProps {
  pokemonQuestions: Schema['DailyTest']['type'] | undefined
  setPokemonQuestions: (
    newPokemonQuestions: Schema['DailyTest']['type']
  ) => void
  currentQuestion: Schema['PokemonQuestion']['type'] | undefined
  setCurrentQuestion: (
    newCurrentQuestion: Schema['PokemonQuestion']['type']
  ) => void
}

export const useQuestionStore = create<QuestionStoreProps>((set) => ({
  pokemonQuestions: undefined,
  setPokemonQuestions: (newPokemonQuestions: Schema['DailyTest']['type']) =>
    set(() => ({ pokemonQuestions: newPokemonQuestions })),
  currentQuestion: undefined,
  setCurrentQuestion: (newCurrentQuestion: Schema['PokemonQuestion']['type']) =>
    set(() => ({ currentQuestion: newCurrentQuestion })),
}))
