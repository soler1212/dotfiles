import { createState, createEffect, createRoot } from "ags"
import { themes, Theme } from "./themes"
import { Gdk, Gtk } from "ags/gtk4"

class ThemeService {
  private _state = createState<Theme>(themes[0])
  private _provider: Gtk.CssProvider

  constructor() {
    this._provider = new Gtk.CssProvider()
    Gtk.StyleContext.add_provider_for_display(
      Gdk.Display.get_default()!,
      this._provider,
      Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION
    )

    const [currentTheme] = this._state
    createRoot(() => {
      createEffect(() => {
        this.applyTheme(currentTheme())
      })
    })
  }

  get currentTheme() {
    return this._state[0]
  }

  setTheme(name: string) {
    const theme = themes.find((t) => t.name === name)
    if (theme) {
      const [, setTheme] = this._state
      setTheme(theme)
    }
  }

  private applyTheme(theme: Theme) {
    const cssVars = Object.entries(theme.colors)
      .map(([key, value]) => `--${key.replace("_", "-")}: ${value};`)
      .join("\n")

    const css = `* { ${cssVars} }`
    
    try {
        // GTK 4 load_from_data expects a string or Uint8Array
        this._provider.load_from_data(css, -1)
    } catch (e) {
        console.error("Failed to apply CSS via CssProvider:", e)
    }
  }
}

export const themeService = new ThemeService()
export default themeService
