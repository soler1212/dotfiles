import { Gtk } from "ags/gtk4"
import { createComputed } from "ags"
import { swayMode } from "../../services/sway"

export function SwayMode() {
  const isVisible = createComputed(() => {
    const mode = swayMode().toLowerCase().trim()
    return mode !== "default" && mode !== ""
  })

  const modeText = createComputed(() => swayMode())

  return (
    <box 
      class="sway-mode" 
      visible={isVisible}
    >
      <label 
        label={modeText} 
        class="sway-mode-label"
      />
    </box>
  )
}
