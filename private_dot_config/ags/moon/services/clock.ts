import { createPoll } from "ags/time"
import GLib from "gi://GLib"

export const createClockPoll = (format: string | (() => string)) => createPoll("", 1000, () => {
  if (typeof format === "function") {
    return format()
  }
  return GLib.DateTime.new_now_local().format(format)!
})
