import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createComputed } from "ags"
import { swayMode } from "./services/sway"
import Bar2 from "./widget/Bar2"

const css = "./style.scss"

function SwayModeWindow(gdkmonitor: Gdk.Monitor) {
  const isVisible = createComputed(() => {
    const mode = swayMode().toLowerCase().trim()
    return mode !== "default" && mode !== ""
  })

  const modeText = createComputed(() => swayMode())

  return (
    <window
      name={`sway-mode-${gdkmonitor.get_model() || "unknown"}`}
      class="SwayModeWindow"
      visible={isVisible}
      gdkmonitor={gdkmonitor}
      anchor={Astal.WindowAnchor.NONE}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={app}
    >
      <box class="sway-mode-container" orientation={Gtk.Orientation.VERTICAL}>
        <label class="sway-mode-title" label="SWAY MODE" />
        <box class="sway-mode-content">
          <label class="sway-mode-text" label={modeText} />
        </box>
        <label class="sway-mode-hint" label="Prems ESC per sortir" />
      </box>
    </window>
  )
}

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
