import { Gtk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { createPoll } from "ags/time"
import { Accessor, For } from "ags"

export function Workspaces() {
  const workspaces = createPoll([], 1000, "swaymsg -r -t get_workspaces", (out) => {
    try {
      const jsonStart = out.indexOf("[")
      if (jsonStart !== -1) {
        const res = JSON.parse(out.substring(jsonStart))
        return res.sort((a: any, b: any) => a.name.localeCompare(b.name, undefined, { numeric: true }))
      }
    } catch (e) {
      // JSON failed, continue to regex fallback
    }

    // Fallback to regex parsing for pretty-print text
    const res: any[] = []
    const lines = out.split("\n")
    for (const line of lines) {
      const match = line.trim().match(/^Workspace\s+(.+?)(?:\s+\(([^)]+)\))?$/)
      if (match) {
        res.push({
          name: match[1],
          focused: (match[2] || "").includes("focused"),
          urgent: (match[2] || "").includes("urgent"),
        })
      }
    }
    return res.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
  })

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
