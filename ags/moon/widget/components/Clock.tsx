import { Gtk } from "ags/gtk4"
import { createClockPoll } from "../../services/clock"

interface ClockProps {
  format?: string
}

export function Clock({ format = "%H:%M" }: ClockProps) {
  const time = createClockPoll(format)

  return (
    <menubutton>
      <label label={time} />
      <popover>
        <Gtk.Calendar />
      </popover>
    </menubutton>
  )
}
