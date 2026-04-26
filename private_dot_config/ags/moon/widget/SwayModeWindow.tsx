import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createComputed } from "ags"
import { swayMode } from "../services/sway"
import { themeService } from "../ThemeService"

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
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={app}
      marginTop={12}
      marginRight={12}
      css={themeService.cssVars}
    >
      <box 
        class="mode-card-compact" 
        spacing={12}
        valign={Gtk.Align.START}
        halign={Gtk.Align.END}
      >
        <label class="mode-icon-small" label="󱄅" />
        <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
          <label class="mode-label-small" label="Mode actiu" halign={Gtk.Align.START} />
          <label class="mode-value-small" label={modeText} halign={Gtk.Align.START} />
        </box>
      </box>
    </window>
  )
}
