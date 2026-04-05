import { createPoll } from "ags/time"
import GLib from "gi://GLib"

export const createClockPoll = (format: string) => createPoll("", 1000, () => {
  return GLib.DateTime.new_now_local().format(format)!
})
