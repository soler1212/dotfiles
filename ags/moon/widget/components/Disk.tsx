import { Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"
import { For } from "ags"
import { PopupSection, PopupTitle } from "../atoms/Popup"
import { DataRow, DataKey, DataValue } from "../atoms/Data"
import { PopupScroll } from "../atoms/Layout"

export function Disk() {
  const disks = createPoll(
    [{ used: "0", total: "0", percent: 0, free: "0", path: "/", filesystem: "" }],
    10000,
    "df -h",
    (out) => {
      try {
        const lines = out.split("\n").slice(1)
        const res = lines
          .map((line) => line.trim().split(/\s+/))
          .filter((parts) => parts.length >= 6 && parts[0].startsWith("/dev/"))
          .map((parts) => ({
            filesystem: parts[0],
            total: parts[1],
            used: parts[2],
            free: parts[3],
            percent: parseInt(parts[4].replace("%", "")),
            path: parts[5],
          }))
          .sort((a, b) => {
            if (a.path === "/") return -1
            if (b.path === "/") return 1
            return a.path.localeCompare(b.path)
          })
        return res.length > 0
          ? res
          : [
              {
                used: "0",
                total: "0",
                percent: 0,
                free: "0",
                path: "/",
                filesystem: "",
              },
            ]
      } catch (e) {
        console.error("Disk Poll Error:", e)
        return [
          {
            used: "0",
            total: "0",
            percent: 0,
            free: "0",
            path: "/",
            filesystem: "",
          },
        ]
      }
    },
  )

  const rootDisk = disks.as((d) => d.find((disk) => disk.path === "/") || d[0])

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
