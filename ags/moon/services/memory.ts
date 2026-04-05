import { createPoll } from "ags/time"

export interface MemoryData {
  percent: number
  used: number
  total: number
  free: number
  available: number
  cache: number
  swapTotal: number
  swapUsed: number
  swapPercent: number
}

export const memory = createPoll<MemoryData>(
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

export const formatMB = (mb: number) => {
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)}GB`
  return `${mb}MB`
}
