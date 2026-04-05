import { Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"
import { For } from "ags"

export function CPU() {
  const cpu = createPoll(
    { usage: 0, load: "", cores: [] as number[] },
    2000,
    'bash -c "top -bn1 | grep -E \'%Cpu\\(s\\)|load average\'; top -bn1 -1 | grep \'%Cpu[0-9]\'\"',
    (out) => {
      try {
        const lines = out.split("\n")
        let usage = 0
        const cores: number[] = []
        let load = ""

        for (const line of lines) {
          if (line.includes("load average:")) {
            load = line.split("load average: ")[1] || ""
          } else if (line.includes("%Cpu(s):")) {
            const match = line.match(/([\d.,]+)\s+id/)
            if (match) {
              usage = Math.round(100 - parseFloat(match[1].replace(",", ".")))
            }
          } else if (line.includes("%Cpu")) {
            const matches = line.matchAll(/%?Cpu(\d+)\s*:.*?([\d.,]+)\s+id/g)
            for (const m of matches) {
              const index = parseInt(m[1])
              cores[index] = Math.round(
                100 - parseFloat(m[2].replace(",", ".")),
              )
            }
          }
        }
        return { usage, load, cores }
      } catch (e) {
        console.error("CPU Poll Error:", e)
        return { usage: 0, load: "error", cores: [] }
      }
    },
  )

  return (
    <menubutton class="cpu">
      <box spacing={4}>
        <label label="󰘚" />
        <label label={cpu.as((c) => `${c.usage}%`)} />
      </box>
      <popover class="network-popover">
        <box orientation={Gtk.Orientation.VERTICAL} widthRequest={380}>
          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
            <label class="popup-title" label="CPU Status" halign={Gtk.Align.START} />
            <label class="popup-value-large" label={cpu.as((c) => `${c.usage}% Usage`)} halign={Gtk.Align.START} />
            <label class="popup-label-detail" label={cpu.as((c) => `Load: ${c.load}`)} halign={Gtk.Align.START} />
          </box>

          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section" visible={cpu.as((c) => c.cores.length > 0)}>
            <label class="popup-title" label="Per-Core Usage" halign={Gtk.Align.START} />
            <Gtk.ScrolledWindow heightRequest={180} vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC} class="popup-scroll">
              <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                <For
                  each={cpu.as((c) => {
                    const pairs = []
                    for (let i = 0; i < c.cores.length; i += 2) {
                      pairs.push({
                        c1: { id: i, val: c.cores[i] },
                        c2:
                          c.cores[i + 1] !== undefined
                            ? { id: i + 1, val: c.cores[i + 1] }
                            : null,
                      })
                    }
                    return pairs
                  })}
                >
                  {(pair) => (
                    <box spacing={16} class="popup-data-row">
                      <box spacing={8} hexpand>
                        <label label={`C${pair.c1.id}`} class="popup-data-key" />
                        <label label={`${pair.c1.val}%`} class="popup-data-value" hexpand halign={Gtk.Align.END} />
                      </box>
                      {pair.c2 && (
                        <box spacing={8} hexpand>
                          <label label={`C${pair.c2.id}`} class="popup-data-key" />
                          <label label={`${pair.c2.val}%`} class="popup-data-value" hexpand halign={Gtk.Align.END} />
                        </box>
                      )}
                    </box>
                  )}
                </For>
              </box>
            </Gtk.ScrolledWindow>
          </box>
        </box>
      </popover>
    </menubutton>
  )
}
