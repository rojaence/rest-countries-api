import { defineStore } from 'pinia'

export const useCountriesStore = defineStore({
  id: 'countries',
  state: () => ({
    countries: [],
    regions: ['Africa', 'America', 'Asia', 'Europe'],
    selectedRegion: '',
  }),
  getters: {
    
  },
  actions: {
    async getRegionItems() {
      const request = await fetch('https://restcountries.com/v3.1/all');
      console.log('Petición a rest')
      console.log(request);
    },
    selectRegion(value) {
      this.state.selectedRegion = value;
    }
  }
})