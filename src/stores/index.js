import { defineStore } from 'pinia'

export const useIndexStore = defineStore({
  id: 'index',
  state: () => ({
    darkMode: false,
  }),
  actions: {
    setDarkMode(value) {
      this.darkMode = value;
    }
  }
})