import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar2 from "./widget/Bar2"
import "./ThemeService" // Initialize theme service

// Strip @charset if present, as GTK 4 doesn't like it
const css = style.startsWith("@charset") 
  ? style.split("\n").slice(1).join("\n") 
  : style

app.start({
  css: css,
  main() {
    app.get_monitors().map(Bar2)
  },
})
