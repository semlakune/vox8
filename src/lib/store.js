import { create } from 'zustand'

const useStore = create((set) => ({
  autoInfinite: true,
  setAutoInfinite: (value) => set({ autoInfinite: value }),
}))

export default useStore