import { createState, createComputed } from "ags"
import { themes, Theme, barPresets, BarPreset } from "./themes"

class ThemeService {
  private _theme = createState<Theme>(themes[0])
  private _preset = createState<BarPreset>(barPresets[1]) // Modern Flat

  // Accessors
  public theme = this._theme[0]
  public preset = this._preset[0]

  // This generates the full CSS for the bar inner container
  public barStyle = createComputed(() => {
    const t = this.theme()
    const p = this.preset()
    
    const barBg = p.transparent ? "transparent" : t.colors.bg
    const barBorder = p.border ? "1px solid rgba(255, 255, 255, 0.1)" : "none"
    
    return `
      background-color: ${barBg};
      margin: ${p.margin};
      padding: ${p.padding};
      border-radius: ${p.borderRadius}px;
      border: ${barBorder};
      min-height: 28px;
    `
  })

  // This generates color variables for the rest of the UI (popups, etc)
  public cssVars = createComputed(() => {
    const t = this.theme()
    return Object.entries(t.colors)
      .map(([key, value]) => `--${key.replace("_", "-")}: ${value};`)
      .join(" ")
  })

  setTheme(name: string) {
    const theme = themes.find((t) => t.name === name)
    if (theme) {
      const [, setTheme] = this._theme
      setTheme(theme)
    }
  }

  setPreset(name: string) {
    const preset = barPresets.find((p) => p.name === name)
    if (preset) {
      const [, setPreset] = this._preset
      setPreset(preset)
    }
  }
}

export const themesState = createState(themes)[0]
export const presetsState = createState(barPresets)[0]

export const themeService = new ThemeService()
export default themeService
