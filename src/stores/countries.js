import { defineStore } from 'pinia'

export const useCountriesStore = defineStore({
  id: 'countries',
  state: () => ({
    countries: [],
    countryCodes: [],
    loadingData: false,
    requestList: [],
    regions: ['Africa', 'America', 'Asia', 'Europe'],
  }),
  getters: {
    filterCountries: (state) => {
      return ({ countryName: countryName, region: region } = { countryName: '', region: ''}) => {
        let data = [];
        if (!countryName && !region || !countryName && region === 'all') {
          data = state.countries;
        } else if (countryName && !region) {
          data = state.countries.filter(c => c.name.common.toLowerCase().trim().includes(countryName.toLowerCase().trim()));
        } else if (!countryName && region) {
          data = state.countries.filter(c => c.region.toLowerCase().trim().includes(region.toLowerCase().trim()));
        } else if (countryName && region === 'all') {
          data = state.countries.filter(c => c.name.common.toLowerCase().trim().includes(countryName.toLowerCase().trim()));
        } else {
          data = state.countries.filter(c => c.name.common.toLowerCase().trim().includes(countryName.toLowerCase().trim()) && c.region.toLowerCase().trim().includes(region.toLowerCase().trim()));
        }
        data = data.map(country => {
          let countryBorders = country.borders ? 
          (
            country.borders.map(border => {
              return state.countryCodes.find(c => c.codes.includes(border)).name;
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
          }
        })
        // state.loadingData = false;
        return data;
      }
    },
    hasCountries: (state) => {
      return state.countries.length > 0;
    }
  },
  actions: {
    async getCountries() {
      this.countries = [];
      this.loadingData = true;
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
      this.countries = response;
      this.loadingData = false; 
    },
  }
})