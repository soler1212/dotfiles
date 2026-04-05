import { Gtk } from "ags/gtk4"
import { windowName } from "../../services/activewindow"

export function ActiveWindow() {
  return (
    <box class="active-window">
      <label label={windowName} />
    </box>
  )
}
