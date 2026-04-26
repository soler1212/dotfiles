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
    
    // Helper to convert hex to rgb components
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        null
    }

    // 1. Core Color Palette
    const colors = Object.entries(t.colors)
      .flatMap(([key, value]) => {
        const k = key.replace("_", "-")
        const vars = [`--${k}: ${value};`]
        const rgb = hexToRgb(value)
        if (rgb) vars.push(`--${k}-rgb: ${rgb};`)
        return vars
      })
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
      `--icon-size: ${p.iconSize}px;`,
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

  // Parsed Margins for Window props
  public getMargins = createComputed(() => {
    const marginStr = this.preset().innerBarMargin
    const parts = marginStr.split(" ").map(p => parseInt(p) || 0)
    
    let top = 0, right = 0, bottom = 0, left = 0

    if (parts.length === 1) {
      top = right = bottom = left = parts[0]
    } else if (parts.length === 2) {
      top = bottom = parts[0]
      right = left = parts[1]
    } else if (parts.length === 3) {
      top = parts[0]
      right = left = parts[1]
      bottom = parts[2]
    } else if (parts.length === 4) {
      top = parts[0]
      right = parts[1]
      bottom = parts[2]
      left = parts[3]
    }

    return { top, right, bottom, left }
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
