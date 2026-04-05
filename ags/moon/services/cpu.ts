import { createPoll } from "ags/time"

export interface CPUData {
  usage: number
  load: string
  cores: number[]
}

export const cpu = createPoll<CPUData>(
  { usage: 0, load: "", cores: [] },
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
