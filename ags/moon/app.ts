import app from "ags/gtk4/app"
import Bar2 from "./widget/Bar2"
import { SwayModeWindow } from "./widget/SwayModeWindow"
import MoonWidget from "./widget/moon"

// Ruta del fitxer SCSS neta
const css = "./style.scss"

app.start({
  css: css,
  main() {
    const monitors = app.get_monitors()
    for (const monitor of monitors) {
      Bar2(monitor)
      SwayModeWindow(monitor)
      MoonWidget(monitor)
    }
  },
})
