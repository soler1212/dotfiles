import { Gtk } from "ags/gtk4"
import { PopupSection, PopupTitle, PopupValueLarge, PopupDetail } from "../atoms/Popup"
import { DataRow, DataKey, DataValue } from "../atoms/Data"
import { memory, formatMB } from "../../services/memory"

export function Memory() {
  return (
    <menubutton class="memory">
      <box spacing={4}>
        <label label="󰍛" />
        <label label={memory.as((r) => `${r.percent}%`)} />
      </box>
      <popover class="network-popover">
        <box orientation={Gtk.Orientation.VERTICAL} widthRequest={380}>
          <PopupSection>
            <PopupTitle label="Memory Status" />
            <PopupValueLarge label={memory.as((r) => `${r.percent}% RAM Used`)} />
            <PopupDetail label={memory.as((r) => `Used: ${formatMB(r.used)} / Total: ${formatMB(r.total)}`)} />
          </PopupSection>

          <PopupSection>
            <PopupTitle label="Breakdown" />
            <DataRow spacing={16}>
              <box orientation={Gtk.Orientation.VERTICAL} hexpand>
                <DataKey label="Available" />
                <DataValue label={memory.as((r) => formatMB(r.available))} halign={Gtk.Align.START} />
              </box>
              <box orientation={Gtk.Orientation.VERTICAL} hexpand>
                <DataKey label="Cached" />
                <DataValue label={memory.as((r) => formatMB(r.cache))} halign={Gtk.Align.START} />
              </box>
            </DataRow>
          </PopupSection>

          <PopupSection visible={memory.as((r) => r.swapTotal > 0)}>
            <PopupTitle label="Swap Usage" />
            <PopupValueLarge label={memory.as((r) => `${r.swapPercent}% Used`)} />
            <PopupDetail label={memory.as((r) => `Used: ${formatMB(r.swapUsed)} / Total: ${formatMB(r.swapTotal)}`)} />
          </PopupSection>
        </box>
      </popover>
    </menubutton>
  )
}
