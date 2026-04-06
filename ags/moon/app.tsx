import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createComputed } from "ags"
import { swayMode } from "./services/sway"
import Bar2 from "./widget/Bar2"
import { SwayModeWindow } from "./widget/SwayModeWindow"

const css = "./style.scss"

app.start({
  css: css,
  main() {
    const monitors = app.get_monitors()
    for (const monitor of monitors) {
      Bar2(monitor)
      SwayModeWindow(monitor)
    }
  },
})
