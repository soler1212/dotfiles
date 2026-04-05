import { Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"
import { For } from "ags"

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
          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
            <label class="popup-title" label="Disk Status" halign={Gtk.Align.START} />
            <Gtk.ScrolledWindow heightRequest={240} vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC} class="popup-scroll">
              <box orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                <For each={disks}>
                  {(d) => (
                    <box orientation={Gtk.Orientation.VERTICAL} class="popup-data-row">
                      <box spacing={8}>
                        <label class="popup-data-value" label={d.path} halign={Gtk.Align.START} />
                        <label
                          label={`${d.percent}%`}
                          class="popup-data-value"
                          css={d.percent > 90 ? "color: var(--red);" : "color: var(--mauve);"}
                          halign={Gtk.Align.END}
                          hexpand
                        />
                      </box>
                      <label class="popup-data-key" label={`${d.used} of ${d.total} (${d.free} free)`} halign={Gtk.Align.START} />
                      <label label={d.filesystem} css="font-size: 9px; opacity: 0.4;" class="popup-data-key" />
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
