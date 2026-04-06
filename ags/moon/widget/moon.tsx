import { Astal, Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"
import { execAsync } from "ags/process"

const moonPhase = createPoll("🌑", 3600000, `bash -c "curl -s 'wttr.in/?format=%m' || echo '🌑' "`)

export function MoonWidget(monitor = 0) {
const { BOTTOM, RIGHT } = Astal.WindowAnchor

    return (
      <window
        visible
        name={`moon-${monitor}`}
        anchor={BOTTOM  | RIGHT}>
        <button
          $type="start"
          onClicked={() => execAsync("echo hello").then(console.log).catch(console.error)}
          hexpand
          halign={Gtk.Align.CENTER}
        >
          <label label="Welcome to AGS!" />
        </button>
      <box
        visible
        css="margin: 20px; background-color: rgba(30, 30, 46, 0.8); border-radius: 12px; border: 2px solid #89b4fa;"
      >
        <label label={moonPhase}          css="font-size: 30px; padding: 15px; color: #cdd6f4;" />
        </box>
      </window>
    )
}
