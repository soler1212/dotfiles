import { Gtk } from "ags/gtk4"
import { Binding } from "ags"

export const PopupSection = ({ children, visible = true }: { children: any, visible?: boolean | Binding<boolean> }) => (
  <box orientation={Gtk.Orientation.VERTICAL} class="popup-section" visible={visible}>
    {children}
  </box>
)

export const PopupTitle = ({ label }: { label: string | Binding<string> }) => (
  <label class="popup-title" label={label} halign={Gtk.Align.START} />
)

export const PopupValueLarge = ({ label }: { label: string | Binding<string> }) => (
  <label class="popup-value-large" label={label} halign={Gtk.Align.START} />
)

export const PopupDetail = ({ label, maxWidthChars = 0, ellipsize = 0 }: { label: string | Binding<string>, maxWidthChars?: number, ellipsize?: Gtk.EllipsizeMode }) => (
  <label 
    class="popup-label-detail" 
    label={label} 
    halign={Gtk.Align.START} 
    maxWidthChars={maxWidthChars}
    ellipsize={ellipsize}
  />
)
