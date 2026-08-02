import app from "ags/gtk4/app"
import Bar from "./widget/Bar"
import { SwayModeWindow } from "./widget/SwayModeWindow"
import MoonWidget from "./widget/moon"
import DateTimeWidget from "./widget/datetime"

const css = "./style.scss"

app.start({
  css: css,
  main() {
    const monitors = app.get_monitors()
    for (const monitor of monitors) {
      Bar(monitor)
      SwayModeWindow(monitor)
      MoonWidget(monitor)
      DateTimeWidget(monitor)
    }
  },
})
