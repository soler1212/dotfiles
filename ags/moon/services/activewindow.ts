import { createPoll } from "ags/time"

export const windowName = createPoll("", 500, `bash -c "swaymsg -r -t get_tree || echo '{}' "`, (out) => {
  try {
    const jsonStart = out.indexOf("{")
    if (jsonStart === -1) return ""
    const tree = JSON.parse(out.substring(jsonStart))
    const findFocused = (node: any): any => {
      if (node.focused) return node
      for (const child of node.nodes || []) {
        const res = findFocused(child)
        if (res) return res
      }
      for (const child of node.floating_nodes || []) {
        const res = findFocused(child)
        if (res) return res
      }
      return null
    }
    const focused = findFocused(tree)
    return focused ? focused.name || "" : ""
  } catch (e) {
    return ""
  }
})
