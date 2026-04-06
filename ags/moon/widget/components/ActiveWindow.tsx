import { Gtk } from "ags/gtk4"
import Pango from "gi://Pango"
import { windowName } from "../../services/activewindow"

export function ActiveWindow() {
  return (
    <box class="active-window">
      <label
        label={windowName}
        tooltipText={windowName}
        maxWidthChars={35}
        ellipsize={Pango.EllipsizeMode.END}
        xalign={0}
      />
    </box>
  )
}
