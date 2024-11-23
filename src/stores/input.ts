import { Species } from '@pkmn/dex'
import { create } from 'zustand'

interface InputStoreProps {
  input: string
  setInput: (newInput: string) => void
  clearInput: () => void
  selectedPokemon: Species | null
  setSelectedPokemon: (pokemon: Species | null) => void
}

export const useInputStore = create<InputStoreProps>((set) => ({
  input: '',
  setInput: (newInput: string) => set(() => ({ input: newInput })),
  clearInput: () => set({ input: '' }),
  selectedPokemon: null,
  setSelectedPokemon: (pokemon: Species | null) =>
    set(() => ({ selectedPokemon: pokemon })),
}))
