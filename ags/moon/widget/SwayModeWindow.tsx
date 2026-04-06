import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createComputed } from "ags"
import { swayMode } from "../services/sway"

export function SwayModeWindow(gdkmonitor: Gdk.Monitor) {
  const isVisible = createComputed(() => {
    const mode = swayMode().toLowerCase().trim()
    return mode !== "default" && mode !== ""
  })

  const modeText = createComputed(() => swayMode().toUpperCase())

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
      <box 
        class="hacker-container" 
        orientation={Gtk.Orientation.VERTICAL}
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
      >
        <box class="hacker-header" halign={Gtk.Align.FILL}>
            <label class="hacker-status" label="● SYSTEM_MODE" />
            <box hexpand />
        </box>
        
        <box class="hacker-content" orientation={Gtk.Orientation.VERTICAL} halign={Gtk.Align.CENTER}>
            <label class="hacker-prefix" label=">>> ACCESSING:" halign={Gtk.Align.START} />
            <box spacing={8} halign={Gtk.Align.CENTER}>
                <label class="hacker-bracket" label="[" />
                <label class="hacker-text" label={modeText} />
                <label class="hacker-bracket" label="]" />
            </box>
        </box>

        <box class="hacker-footer" halign={Gtk.Align.FILL}>
            <label class="hacker-hint" label="TERMINATE WITH [ESC]" halign={Gtk.Align.CENTER} hexpand />
        </box>
      </box>
    </window>
  )
}
