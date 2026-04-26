import { Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { Accessor, For, createComputed } from "ags"
import { workspaces } from "../../services/workspaces"

export function Workspaces({ monitor }: { monitor: Gdk.Monitor }) {
  const icons: any = {
    urgent: "!",
    focused: "●",
    default: "○",
  }

  const filtered = createComputed(() => {
    const geo = monitor.get_geometry()
    const allWorkspaces = workspaces()
    
    return allWorkspaces.filter(w => {
      // Check if the workspace belongs to this monitor based on coordinates.
      // Sway's workspace rect.x should be within [monitor.x, monitor.x + monitor.width)
      return w.rect.x >= geo.x && w.rect.x < (geo.x + geo.width)
    })
  })

  return (
    <box class="workspaces" visible>
      <For each={filtered}>
        {(item, index: Accessor<number>) => (
          <button
            class={[
              item.visible ? "active" : "",
              item.focused ? "focused" : "",
              item.urgent ? "urgent" : ""
            ].join(" ")}
            onClicked={() => execAsync(`swaymsg workspace ${item.name}`).catch(console.error)}
          >
            <label label={item.urgent ? icons.urgent : item.name} />
          </button>
        )}
      </For>
    </box>
  )
}
