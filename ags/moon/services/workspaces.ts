import { createPoll } from "ags/time"

export interface Workspace {
  name: string
  focused: boolean
  urgent: boolean
}

export const workspaces = createPoll([], 1000, `bash -c "swaymsg -r -t get_workspaces || echo '[]' "`, (out) => {
  try {
    const jsonStart = out.indexOf("[")
    if (jsonStart !== -1) {
      const res = JSON.parse(out.substring(jsonStart))
      return res.sort((a: any, b: any) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    }
  } catch (e) {
    // JSON failed, continue to regex fallback
  }

  // Fallback to regex parsing for pretty-print text
  const res: Workspace[] = []
  const lines = out.split("\n")
  for (const line of lines) {
    const match = line.trim().match(/^Workspace\s+(.+?)(?:\s+\(([^)]+)\))?$/)
    if (match) {
      res.push({
        name: match[1],
        focused: (match[2] || "").includes("focused"),
        urgent: (match[2] || "").includes("urgent"),
      })
    }
  }
  return res.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
})
