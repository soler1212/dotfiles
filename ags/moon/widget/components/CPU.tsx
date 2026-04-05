import { Gtk } from "ags/gtk4"
import { For } from "ags"
import { PopupContainer, PopupSection, PopupTitle, PopupValueLarge, PopupDetail } from "../atoms/Popup"
import { DataRow, DataKey, DataValue } from "../atoms/Data"
import { PopupScroll } from "../atoms/Layout"
import { cpu } from "../../services/cpu"

export function CPU() {
  return (
    <menubutton class="cpu">
      <box spacing={4}>
        <label label="󰘚" />
        <label label={cpu.as((c) => `${c.usage}%`)} />
      </box>
      <popover class="network-popover">
        <PopupContainer>
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
        </PopupContainer>
      </popover>
    </menubutton>
  )
}
