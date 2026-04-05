import { createState, createEffect, createRoot } from "ags"
import { themes, Theme } from "./themes"
import { Gdk, Gtk } from "ags/gtk4"

class ThemeService {
  private _state = createState<Theme>(themes[0])
  private _provider: Gtk.CssProvider

  constructor() {
    this._provider = new Gtk.CssProvider()
    
    // Usem la prioritat més alta (USER) per sobreposar-nos als estils de l'aplicació
    const display = Gdk.Display.get_default()
    if (display) {
      Gtk.StyleContext.add_provider_for_display(
        display,
        this._provider,
        Gtk.STYLE_PROVIDER_PRIORITY_USER
      )
    }

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
    console.log(`Setting theme to: ${name}`)
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

    // GTK 4 sol ser més estable si apliquem les variables a la classe principal de la finestra o a l'asterisc (*)
    // Sense !important per evitar problemes sintàctics amb les variables
    const css = `* { ${cssVars} }`
    
    try {
      this._provider.load_from_data(css, -1)
      console.log(`Theme ${theme.name} applied`)
    } catch (e) {
      console.error("Failed to apply CSS variables:", e)
    }
  }
}

export const themeService = new ThemeService()
export default themeService
