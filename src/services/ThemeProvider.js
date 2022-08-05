export default class ThemeProvider {
  selectDarkMode(value) {
    value ? 
    document.documentElement.classList.add("theme--dark")
    : 
    document.documentElement.classList.remove("theme--dark")
  };

  setDarkMode() {
    let value = localStorage.getItem("RestCountriesApiDarkMode"); 
    let response = false;
    if (value === "true") {
      localStorage.setItem("RestCountriesApiDarkMode", false)
      this.selectDarkMode(false);
    } else if (value === "false") {
      localStorage.setItem("RestCountriesApiDarkMode", true)
      this.selectDarkMode(true);
      response = true;
    } else {
      localStorage.setItem("RestCountriesApiDarkMode", false)
      this.selectDarkMode(false);
    }
    return response;
  }

  setThemeOnInit() {
    document.documentElement.classList.add("theme");
    let response = false;
    let value = localStorage.getItem("RestCountriesApiDarkMode"); 
    if (value === "true") {
      this.selectDarkMode(true);
      response = true;
    } else if (value === "false") {
      this.selectDarkMode(false);
    } else {
      this.setDarkMode();
    }
    return response;
  };
}