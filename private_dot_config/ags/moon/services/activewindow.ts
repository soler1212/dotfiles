import { createState } from "ags"
import { execAsync } from "ags/process"
import { timeout } from "ags/time"

const findSocketCmd = "ls /run/user/1000/sway-ipc.*.sock 2>/dev/null | head -n 1"
const getTreeCmd = `bash -c "export SWAYSOCK=$(${findSocketCmd}); [ -n '\\$SWAYSOCK' ] && swaymsg -r -t get_tree || echo '{}' "`

const [windowNameGetter, setWindowName] = createState("")
export const windowName = windowNameGetter

function updateActiveWindow() {
  execAsync(getTreeCmd)
    .then((out) => {
      try {
        const jsonStart = out.indexOf("{")
        if (jsonStart === -1) {
          setWindowName("")
          return
        }
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
        setWindowName(focused ? focused.name || "" : "")
      } catch (e) {
        setWindowName("")
      }
    })
    .catch(() => setWindowName(""))
}

function listenToSwayWindowEvents() {
  // Escoltarem esdeveniments de finestra i de workspace (per quan canviem de workspace)
  const subscribeCmd = `bash -c "export SWAYSOCK=$(${findSocketCmd}); [ -n '\\$SWAYSOCK' ] && swaymsg -t subscribe '[\\\"window\\\", \\\"workspace\\\"]' | head -n 1"`

  execAsync(subscribeCmd)
    .then(() => {
      updateActiveWindow()
      listenToSwayWindowEvents()
    })
    .catch(() => {
      timeout(1000, listenToSwayWindowEvents)
    })
}

// Inicialització
updateActiveWindow()
listenToSwayWindowEvents()
