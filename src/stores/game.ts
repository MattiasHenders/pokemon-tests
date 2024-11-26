import { create } from 'zustand'

export enum GameType {
  DAILY_PUZZLE = 0,
  UNLIMITED = 1,
}

interface GameStoreProps {
  gameType: GameType
  setGameType: (newGameType: GameType) => void
  gameOverModalOpen: boolean
  setGameOverModalOpen: (open: boolean) => void
}

export const useGameTypeStore = create<GameStoreProps>((set) => ({
  gameType: GameType.DAILY_PUZZLE,
  setGameType: (newGameType: GameType) =>
    set(() => ({ gameType: newGameType })),
  gameOverModalOpen: false,
  setGameOverModalOpen: (open: boolean) =>
    set(() => ({ gameOverModalOpen: open })),
}))
