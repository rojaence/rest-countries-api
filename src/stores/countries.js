import { defineStore } from 'pinia'

export const useCountriesStore = defineStore({
  id: 'countries',
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
    }
  },
  actions: {
    async getCountries() {
      this.countries = [];
      this.loadingData = true;
      try {
        const request = await fetch('https://restcountries.com/v3.1/all',);
        const response = await request.json();
        let regions = response.map(country => country.region);
        regions = [...new Set(regions)];
  
        let codes = response.map(country => {
          return {
            name: country.name.common,
            codes: [country.cca, country.cca2, country.cca3, country.cioc],
          }
        });
        this.countryCodes = codes;
        this.regions = regions;
  
        let data = response.map(country => {
          let countryBorders = country.borders ? 
          (
            country.borders.map(border => {
              return this.countryCodes.find(c => c.codes.includes(border)).name;
            })
          ) : 
          (
            []
          )
          return {
            name: country.name,
            region: country.region,
            capital: country.capital,
            population: country.population,
            flags: country.flags,
            subregion: country.subregion,
            tld: country.tld,
            currencies: country.currencies,
            languages: country.languages,
            borders: countryBorders,
            cca3: country.cca3,
          }
        })
        this.countries = data;
        this.loadingData = false; 
      } catch(error) {
        this.errorConnection = true;
        this.loadingData = false;
      }
    },

    getCountryData(cca3) {
      return this.countries.find(country => country.cca3 === cca3);
    }
  }
})