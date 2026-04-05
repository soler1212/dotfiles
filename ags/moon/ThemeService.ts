import { createState, createComputed } from "ags"
import { themes, Theme, barPresets, BarPreset } from "./themes"

class ThemeService {
  private _theme = createState<Theme>(themes[0])
  private _preset = createState<BarPreset>(barPresets[0]) // Ethereal Glass as default

  // Accessors
  public theme = this._theme[0]
  public preset = this._preset[0]

  // This generates the full CSS for the bar inner container
  public barStyle = createComputed(() => {
    const t = this.theme()
    const p = this.preset()
    
    const barBg = p.transparent ? "transparent" : t.colors.base
    const barBorder = p.border ? `1px solid ${t.colors.border}` : "none"
    
    // Detailed Button logic
    let btnRadius = "4px"
    let btnBg = t.colors.button_bg
    let btnBorder = "none"
    let btnPadding = "0 10px"
    let btnShadow = "none"

    if (p.buttonStyle === "glass") {
      btnRadius = "12px"
      btnBg = "rgba(255, 255, 255, 0.03)"
      btnBorder = "1px solid rgba(255, 255, 255, 0.05)"
      btnShadow = "inset 0 1px 1px rgba(255, 255, 255, 0.05)"
    } else if (p.buttonStyle === "pill") {
      btnRadius = "24px"
      btnBg = t.colors.surface
      btnPadding = "0 14px"
    } else if (p.buttonStyle === "outline") {
      btnRadius = "0px"
      btnBg = "transparent"
      btnBorder = `1px solid ${t.colors.accent}`
    } else if (p.buttonStyle === "subtle") {
      btnRadius = "4px"
      btnBg = "transparent"
      btnPadding = "0 6px"
    }

    return `
      background-color: ${barBg};
      margin: ${p.margin};
      padding: ${p.padding};
      border-radius: ${p.borderRadius}px;
      border: ${barBorder};
      min-height: 32px;
      
      /* Dynamic button variables */
      --btn-radius: ${btnRadius};
      --btn-bg: ${btnBg};
      --btn-border: ${btnBorder};
      --btn-padding: ${btnPadding};
      --btn-shadow: ${btnShadow};
      --btn-spacing: ${p.spacing}px;
      --sep-opacity: ${p.showSeparators ? "1" : "0"};
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
