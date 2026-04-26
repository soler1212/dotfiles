import { Gtk } from "ags/gtk4"

export const PopupScroll = ({ children, height = 200, orientation = Gtk.Orientation.VERTICAL, spacing = 2 }: { children: any, height?: number, orientation?: Gtk.Orientation, spacing?: number }) => (
  <Gtk.ScrolledWindow heightRequest={height} vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC} class="popup-scroll">
    <box orientation={orientation} spacing={spacing}>
      {children}
    </box>
  </Gtk.ScrolledWindow>
)

export const PopupListItem = ({ onClicked, children, css = "" }: { onClicked: () => void, children: any, css?: string }) => (
  <button class="popup-list-item" onClicked={onClicked} css={css}>
    {children}
  </button>
)

export const ModuleSeparator = ({ orientation = Gtk.Orientation.VERTICAL }: { orientation?: Gtk.Orientation }) => (
  <Gtk.Separator class="module-separator" orientation={orientation} />
)
