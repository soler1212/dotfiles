import { Gtk } from "ags/gtk4"
import { For } from "ags"
import { PopupSection, PopupTitle } from "../atoms/Popup"
import { DataRow, DataKey, DataValue } from "../atoms/Data"
import { PopupScroll } from "../atoms/Layout"
import { disks, rootDisk } from "../../services/disk"

export function Disk() {
  return (
    <menubutton class="disk">
      <box spacing={4}>
        <label label="󰋊" />
        <label label={rootDisk.as((d) => `${d.used}/${d.total}`)} />
      </box>
      <popover class="network-popover">
        <box orientation={Gtk.Orientation.VERTICAL} widthRequest={380}>
          <PopupSection>
            <PopupTitle label="Disk Status" />
            <PopupScroll height={240} spacing={12}>
              <For each={disks}>
                {(d) => (
                  <box orientation={Gtk.Orientation.VERTICAL}>
                    <DataRow spacing={8}>
                      <DataValue label={d.path} halign={Gtk.Align.START} />
                      <DataValue
                        label={`${d.percent}%`}
                        css={d.percent > 90 ? "color: var(--red);" : "color: var(--mauve);"}
                        halign={Gtk.Align.END}
                        hexpand
                      />
                    </DataRow>
                    <DataKey label={`${d.used} of ${d.total} (${d.free} free)`} />
                    <label label={d.filesystem} css="font-size: 9px; opacity: 0.4;" class="popup-data-key" />
                  </box>
                )}
              </For>
            </PopupScroll>
          </PopupSection>
        </box>
      </popover>
    </menubutton>
  )
}
