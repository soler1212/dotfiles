import { createState } from "ags"
import { execAsync } from "ags/process"
import { timeout } from "ags/time"

export interface Workspace {
  name: string
  focused: boolean
  urgent: boolean
}

const findSocketCmd = "ls /run/user/1000/sway-ipc.*.sock 2>/dev/null | head -n 1"
const getWorkspacesCmd = `bash -c "export SWAYSOCK=$(${findSocketCmd}); [ -n '\\$SWAYSOCK' ] && swaymsg -r -t get_workspaces || echo '[]' "`

const [workspacesGetter, setWorkspaces] = createState<Workspace[]>([])
export const workspaces = workspacesGetter

function updateWorkspaces() {
  execAsync(getWorkspacesCmd)
    .then((out) => {
      try {
        const jsonStart = out.indexOf("[")
        if (jsonStart !== -1) {
          const res = JSON.parse(out.substring(jsonStart))
          const sorted = res.sort((a: any, b: any) => 
            a.name.localeCompare(b.name, undefined, { numeric: true })
          )
          setWorkspaces(sorted)
        }
      } catch (e) {
        console.error("Error parsing workspaces:", e)
      }
    })
    .catch(console.error)
}

function listenToSwayWorkspaces() {
  const subscribeCmd = `bash -c "export SWAYSOCK=$(${findSocketCmd}); [ -n '\\$SWAYSOCK' ] && swaymsg -t subscribe '[\\\"workspace\\\"]'"`

  execAsync(subscribeCmd)
    .then(() => {
      // Quan rebem un esdeveniment, actualitzem la llista completa
      updateWorkspaces()
      // Tornem a escoltar pel següent esdeveniment
      listenToSwayWorkspaces()
    })
    .catch(() => {
      // Si falla la subscripció, reintentem en 1 segon
      timeout(1000, listenToSwayWorkspaces)
    })
}

// Inicialització
updateWorkspaces()
listenToSwayWorkspaces()
