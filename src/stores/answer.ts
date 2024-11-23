import { create } from 'zustand'

interface AnswerStoreProps {
  invalidGuess: boolean | null
  setInvalidGuess: (newInvalidGuess: boolean | null) => void
  isEqualPokemon: boolean | null
  setIsEqualPokemon: (newIsEqualPokemon: boolean | null) => void
  displayAnswer: boolean
  setDisplayAnswer: (newDisplayAnswer: boolean) => void
}

export const useAnswerStore = create<AnswerStoreProps>((set) => ({
  invalidGuess: null,
  setInvalidGuess: (newInput: boolean | null) =>
    set(() => ({ invalidGuess: newInput })),
  isEqualPokemon: null,
  setIsEqualPokemon: (newIsEqualPokemon: boolean | null) =>
    set(() => ({ isEqualPokemon: newIsEqualPokemon })),
  displayAnswer: false,
  setDisplayAnswer: (newDisplayAnswer: boolean) =>
    set(() => ({ displayAnswer: newDisplayAnswer })),
}))
