import { defineStore } from 'pinia'

export const useCountriesStore = defineStore({
  id: 'countriesStore',
  state: () => ({
    countries: [],
    countryCodes: [],
    loadingData: false,
    regions: [],
    errorConnection: false,
  }),
  getters: {
    hasCountries: (state) => {
      return state.countries.length > 0;
    },
    getCountryData: (state) => {
      return (code) => state.countries.find(country => country.keyCodes.includes(code));
    },
  },
  actions: {
    async getCountries() {
      this.countries = [];
      this.loadingData = true;
      try {
        const request = await fetch('https://restcountries.com/v3.1/all',);
        const response = await request.json();
        let regions = [], codes = [], countries = [];
        response.forEach(country => {
          regions.push(country.region);
          codes.push(
            { name: country.name.common, 
              codes: [country.cca2 || '', country.cca3 || '', country.cioc || ''].filter(code => code !== '')
            });
          country.keyCodes = [country.cca2 || '', country.cca3 || '', country.cioc || ''].filter(code => code !== '');
        });
        regions = [...new Set(regions)];
        this.countryCodes = codes;
        this.regions = regions;
        response.forEach(country => {
          if (country.borders) {
            country.borders = country.borders.map(border => {
              return {
                name: this.countryCodes.find(code => code.codes.includes(border)).name,
                code: border,
              }
            });
          }
          countries.push(country);
        });
        this.countries = countries;
      } catch(error) {
        this.errorConnection = true;
      } finally {
        this.loadingData = false;
      }
    },
  }
})