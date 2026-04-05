import { Gtk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { Accessor, For } from "ags"
import { workspaces } from "../../services/workspaces"

export function Workspaces() {
  const icons: any = {
    urgent: "!",
    focused: "●",
    default: "○",
  }

  return (
    <box class="workspaces" visible>
      <For each={workspaces}>
        {(item, index: Accessor<number>) => (
          <button
            class={item.focused ? "focused" : item.urgent ? "urgent" : ""}
            onClicked={() => execAsync(`swaymsg workspace ${item.name}`)}
          >
            <label label={item.focused ? icons.focused : item.urgent ? icons.urgent : item.name} />
          </button>
        )}
      </For>
    </box>
  )
}
