export default class ThemeProvider {
  constructor () {
    this.DARK_MODE_KEY = "RestCountriesApiDarkMode";
  }

  selectDarkMode(value) {
    value ? 
    document.documentElement.classList.add("theme--dark")
    : 
    document.documentElement.classList.remove("theme--dark")
  };

  setDarkMode() {
    let value = localStorage.getItem(this.DARK_MODE_KEY); 
    let response = false;
    if (value === "true") {
      localStorage.setItem(this.DARK_MODE_KEY, false)
      this.selectDarkMode(false);
    } else if (value === "false") {
      localStorage.setItem(this.DARK_MODE_KEY, true)
      this.selectDarkMode(true);
      response = true;
    } else {
      localStorage.setItem(this.DARK_MODE_KEY, false)
      this.selectDarkMode(false);
    }
    return response;
  }

  setThemeOnInit() {
    document.documentElement.classList.add("theme");
    let response = false;
    let value = localStorage.getItem(this.DARK_MODE_KEY); 
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