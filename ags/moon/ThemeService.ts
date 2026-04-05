import { createState, createComputed } from "ags"
import { themes, Theme } from "./themes"

class ThemeService {
  private _state = createState<Theme>(themes[0])

  // Computed que genera el string de variables CSS cada vegada que el tema canvia
  private _cssVars = createComputed(() => {
    const [currentTheme] = this._state
    const theme = currentTheme()
    return Object.entries(theme.colors)
      .map(([key, value]) => `--${key.replace("_", "-")}: ${value};`)
      .join(" ")
  })

  get currentTheme() {
    return this._state[0]
  }

  get cssVars() {
    return this._cssVars
  }

  setTheme(name: string) {
    console.log(`Switching to theme: ${name}`)
    const theme = themes.find((t) => t.name === name)
    if (theme) {
      const [, setTheme] = this._state
      setTheme(theme)
    }
  }
}

export const themeService = new ThemeService()
export default themeService
