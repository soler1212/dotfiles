import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createComputed } from "ags"
import { swayMode } from "../services/sway"

export function SwayModeWindow(gdkmonitor: Gdk.Monitor) {
  const isVisible = createComputed(() => {
    const mode = swayMode().toLowerCase().trim()
    return mode !== "default" && mode !== ""
  })

  const modeText = createComputed(() => swayMode())

  return (
    <window
      name="sway-mode-window"
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
