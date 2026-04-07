import { createState } from "ags"
import { execAsync } from "ags/process"
import { timeout } from "ags/time"

export interface Workspace {
  name: string
  focused: boolean
  urgent: boolean
  output: string
  rect: { x: number, y: number, width: number, height: number }
}

const findSocketCmd = "ls /run/user/1000/sway-ipc.*.sock 2>/dev/null | head -n 1"
const getWorkspacesCmd = `bash -c "export SWAYSOCK=$(${findSocketCmd}); [ -n '\\$SWAYSOCK' ] && swaymsg -r -t get_workspaces || echo '[]' "`
const getOutputsCmd = `bash -c "export SWAYSOCK=$(${findSocketCmd}); [ -n '\\$SWAYSOCK' ] && swaymsg -r -t get_outputs || echo '[]' "`

const [workspacesGetter, setWorkspaces] = createState<Workspace[]>([])
export const workspaces = workspacesGetter

function updateWorkspaces() {
  Promise.all([
    execAsync(getWorkspacesCmd),
    execAsync(getOutputsCmd)
  ]).then(([workspacesOut, outputsOut]) => {
    try {
      const wsIdx = workspacesOut.indexOf("[")
      const outIdx = outputsOut.indexOf("[")
      
      if (wsIdx === -1 || outIdx === -1) {
        console.error("Could not find start of JSON in swaymsg output")
        return
      }

      const wsJson = JSON.parse(workspacesOut.substring(wsIdx))
      const outsJson = JSON.parse(outputsOut.substring(outIdx))
      
      const res: Workspace[] = wsJson.map((ws: any) => {
        const output = outsJson.find((o: any) => o.name === ws.output)
        return {
          name: ws.name,
          focused: ws.focused,
          urgent: ws.urgent,
          output: ws.output,
          rect: output ? output.rect : { x: 0, y: 0, width: 0, height: 0 }
        }
      })

      const sorted = res.sort((a, b) => 
        a.name.localeCompare(b.name, undefined, { numeric: true })
      )
      setWorkspaces(sorted)
    } catch (e) {
      console.error("Error parsing workspaces or outputs:", e)
    }
  }).catch(console.error)
}

function listenToSwayWorkspaces() {
  const subscribeCmd = `bash -c "export SWAYSOCK=$(${findSocketCmd}); [ -n '\\$SWAYSOCK' ] && swaymsg -t subscribe '[\\\"workspace\\\", \\\"output\\\"]'"`

  execAsync(subscribeCmd)
    .then(() => {
      updateWorkspaces()
      listenToSwayWorkspaces()
    })
    .catch(() => {
      timeout(1000, listenToSwayWorkspaces)
    })
}

// Inicialització
updateWorkspaces()
listenToSwayWorkspaces()
