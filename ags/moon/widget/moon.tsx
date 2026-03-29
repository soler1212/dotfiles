import app from "ags/gtk4/app"
import { Astal } from "ags/gtk4"
import { createPoll } from "ags/time"

const moonPhase = createPoll("🌑", 3600000, `bash -c "curl -s 'wttr.in/?format=%m'"`)

function Bar(monitor = 0) {
const { BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

    return (
      <window
        visible
      anchor={BOTTOM  | RIGHT}>
      <box
        visible
        css="margin: 20px; background-color: rgba(30, 30, 46, 0.8); border-radius: 12px; border: 2px solid #89b4fa;"
      >
        <label label={moonPhase}          css="font-size: 30px; padding: 15px; color: #cdd6f4;" />
        </box>
      </window>
    )
}

app.start({
  main() {
    Bar(1);
  },
})
