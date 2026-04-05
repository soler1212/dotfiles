import { Gtk } from "ags/gtk4"
import { Binding } from "ags"

export const DataRow = ({ children, spacing = 8 }: { children: any, spacing?: number }) => (
  <box class="popup-data-row" spacing={spacing}>
    {children}
  </box>
)

export const DataKey = ({ label, hexpand = false }: { label: string | Binding<string>, hexpand?: boolean }) => (
  <label class="popup-data-key" label={label} halign={Gtk.Align.START} hexpand={hexpand} />
)

export const DataValue = ({ label, hexpand = false, halign = Gtk.Align.END, css = "" }: { label: string | Binding<string>, hexpand?: boolean, halign?: Gtk.Align, css?: string }) => (
  <label class="popup-data-value" label={label} halign={halign} hexpand={hexpand} css={css} />
)
