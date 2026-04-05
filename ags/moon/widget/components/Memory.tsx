import { Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"

export function Memory() {
  const ram = createPoll(
    {
      percent: 0,
      used: 0,
      total: 0,
      free: 0,
      available: 0,
      cache: 0,
      swapTotal: 0,
      swapUsed: 0,
      swapPercent: 0,
    },
    2000,
    "free -m",
    (out) => {
      try {
        const lines = out.split("\n")
        if (lines.length < 2) throw new Error("Unexpected free output")

        const mem = lines[1].trim().split(/\s+/)
        const total = parseInt(mem[1])
        const used = parseInt(mem[2])
        const free = parseInt(mem[3])
        const cache = parseInt(mem[5])
        const available = parseInt(mem[6])
        const percent = total > 0 ? Math.round((used / total) * 100) : 0

        let swapTotal = 0
        let swapUsed = 0
        let swapPercent = 0
        if (lines.length >= 3) {
          const swap = lines[2].trim().split(/\s+/)
          swapTotal = parseInt(swap[1])
          swapUsed = parseInt(swap[2])
          swapPercent =
            swapTotal > 0 ? Math.round((swapUsed / swapTotal) * 100) : 0
        }

        return {
          percent,
          used,
          total,
          free,
          available,
          cache,
          swapTotal,
          swapUsed,
          swapPercent,
        }
      } catch (e) {
        console.error("Memory Poll Error:", e)
        return {
          percent: 0,
          used: 0,
          total: 0,
          free: 0,
          available: 0,
          cache: 0,
          swapTotal: 0,
          swapUsed: 0,
          swapPercent: 0,
        }
      }
    },
  )

  const formatMB = (mb: number) => {
    if (mb >= 1024) return `${(mb / 1024).toFixed(1)}GB`
    return `${mb}MB`
  }

  return (
    <menubutton class="memory">
      <box spacing={4}>
        <label label="󰍛" />
        <label label={ram.as((r) => `${r.percent}%`)} />
      </box>
      <popover class="network-popover">
        <box orientation={Gtk.Orientation.VERTICAL} widthRequest={380}>
          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
            <label class="popup-title" label="Memory Status" halign={Gtk.Align.START} />
            <label class="popup-value-large" label={ram.as((r) => `${r.percent}% RAM Used`)} halign={Gtk.Align.START} />
            <label class="popup-label-detail" label={ram.as((r) => `Used: ${formatMB(r.used)} / Total: ${formatMB(r.total)}`)} halign={Gtk.Align.START} />
          </box>

          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
            <label class="popup-title" label="Breakdown" halign={Gtk.Align.START} />
            <box spacing={16} class="popup-data-row">
              <box orientation={Gtk.Orientation.VERTICAL} hexpand>
                <label label="Available" class="popup-data-key" />
                <label label={ram.as((r) => formatMB(r.available))} class="popup-data-value" />
              </box>
              <box orientation={Gtk.Orientation.VERTICAL} hexpand>
                <label label="Cached" class="popup-data-key" />
                <label label={ram.as((r) => formatMB(r.cache))} class="popup-data-value" />
              </box>
            </box>
          </box>

          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section" visible={ram.as((r) => r.swapTotal > 0)}>
            <label class="popup-title" label="Swap Usage" halign={Gtk.Align.START} />
            <label class="popup-value-large" label={ram.as((r) => `${r.swapPercent}% Used`)} halign={Gtk.Align.START} />
            <label class="popup-label-detail" label={ram.as((r) => `Used: ${formatMB(r.swapUsed)} / Total: ${formatMB(r.swapTotal)}`)} halign={Gtk.Align.START} />
          </box>
        </box>
      </popover>
    </menubutton>
  )
}
