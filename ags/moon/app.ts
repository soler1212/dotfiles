import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar2 from "./widget/Bar2"

app.start({
  css: style,
  main() {
    app.get_monitors().map(Bar2)
  },
})
