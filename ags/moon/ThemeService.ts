import { createState, createComputed } from "ags"
import { themes, Theme, barPresets, BarPreset } from "./themes"

class ThemeService {
  private _theme = createState<Theme>(themes[0])
  private _preset = createState<BarPreset>(barPresets[0]) // Ethereal Glass

  // Accessors
  public theme = this._theme[0]
  public preset = this._preset[0]

  /**
   * Generates a single string of all CSS variables required by style.scss
   */
  public cssVars = createComputed(() => {
    const t = this.theme()
    const p = this.preset()
    
    // 1. Core Color Palette
    const colors = Object.entries(t.colors)
      .map(([key, value]) => `--${key.replace("_", "-")}: ${value};`)
      .join(" ")

    // 2. Combined variable map
    const vars = [
      colors,
      `--font-size: ${p.fontSize};`,
      `--inner-bar-bg: ${p.innerBarBg};`,
      `--inner-bar-border: ${p.innerBarBorder};`,
      `--inner-bar-radius: ${p.innerBarRadius}px;`,
      `--inner-bar-margin: ${p.innerBarMargin};`,
      `--inner-bar-padding: ${p.innerBarPadding};`,
      `--inner-bar-height: ${p.innerBarHeight}px;`,
      `--sep-margin-v: ${p.sepMarginV}px;`,
      `--button-radius: ${p.buttonRadius};`,
      `--button-bg: ${p.buttonBg};`,
      `--button-fg: ${p.buttonFg};`,
      `--button-hover-bg: ${p.buttonHoverBg};`,
      `--button-border: ${p.buttonBorder};`,
      `--button-padding: ${p.buttonPadding};`,
      `--button-shadow: ${p.buttonShadow};`,
      `--button-spacing: ${p.buttonSpacing}px;`,
      `--sep-opacity: ${p.showSeparators ? "1" : "0"};`
    ]

    return vars.join(" ")
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
