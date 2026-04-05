import { createPoll } from "ags/time"

export interface DiskData {
  filesystem: string
  total: string
  used: string
  free: string
  percent: number
  path: string
}

export const disks = createPoll<DiskData[]>(
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

export const rootDisk = disks.as((d) => d.find((disk) => disk.path === "/") || d[0])
