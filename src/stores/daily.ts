import { Schema } from '@/amplify/data/resource'
import { create } from 'zustand'

interface DailyStoreProps {
  lastDailyGame: Schema['UserTests']['type'] | undefined
  setLastDailyGame: (
    lastDailyGame: Schema['UserTests']['type'] | undefined
  ) => void
}

export const useDailyTestStore = create<DailyStoreProps>((set) => ({
  lastDailyGame: undefined,
  setLastDailyGame: (lastDailyGame: Schema['UserTests']['type'] | undefined) =>
    set(() => ({ lastDailyGame })),
}))
