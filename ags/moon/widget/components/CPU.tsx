import { Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"
import { For } from "ags"
import { PopupSection, PopupTitle, PopupValueLarge, PopupDetail } from "../atoms/Popup"
import { DataRow, DataKey, DataValue } from "../atoms/Data"
import { PopupScroll } from "../atoms/Layout"

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
          <PopupSection>
            <PopupTitle label="CPU Status" />
            <PopupValueLarge label={cpu.as((c) => `${c.usage}% Usage`)} />
            <PopupDetail label={cpu.as((c) => `Load: ${c.load}`)} />
          </PopupSection>

          <PopupSection visible={cpu.as((c) => c.cores.length > 0)}>
            <PopupTitle label="Per-Core Usage" />
            <PopupScroll height={180} spacing={4}>
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
                  <DataRow spacing={16}>
                    <box spacing={8} hexpand>
                      <DataKey label={`C${pair.c1.id}`} />
                      <DataValue label={`${pair.c1.val}%`} hexpand />
                    </box>
                    {pair.c2 && (
                      <box spacing={8} hexpand>
                        <DataKey label={`C${pair.c2.id}`} />
                        <DataValue label={`${pair.c2.val}%`} hexpand />
                      </box>
                    )}
                  </DataRow>
                )}
              </For>
            </PopupScroll>
          </PopupSection>
        </box>
      </popover>
    </menubutton>
  )
}
