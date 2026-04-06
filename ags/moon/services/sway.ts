import { createState } from "ags"
import { execAsync } from "ags/process"
import { timeout } from "ags/time"

const [swayModeGetter, setSwayMode] = createState("default")
export const swayMode = swayModeGetter

function listenToSwayMode() {
  const findSocketCmd = "ls /run/user/1000/sway-ipc.*.sock 2>/dev/null | head -n 1"
  // Escoltarem només UN esdeveniment i el procés s'acabarà
  const cmd = `bash -c "export SWAYSOCK=$(${findSocketCmd}); [ -n '\\$SWAYSOCK' ] && swaymsg -t subscribe '[\\\"mode\\\"]'"`

  execAsync(cmd)
    .then((out) => {
      try {
        const json = JSON.parse(out)
        if (json.change) {
          const newMode = json.change.trim()
          setSwayMode(newMode)
        }
      } catch (e) {
        // En cas d'error de JSON, tornem a default per seguretat
        setSwayMode("default")
      }
      // Immediatament tornem a obrir l'escolta pel SEGUENT esdeveniment
      listenToSwayMode()
    })
    .catch(() => {
      // Si falla la comanda (Sway no actiu, etc.), reintentem en 1 segon
      setSwayMode("default")
      timeout(1000, listenToSwayMode)
    })
}

// Iniciem el bucle d'escolta
listenToSwayMode()
