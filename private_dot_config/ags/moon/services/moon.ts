import { createState } from "ags"
import { execAsync } from "ags/process"

export interface MoonData {
  phase_emoji: string
  phase_name: string
  phase_name_cat: string
  illumination: string
  moonrise: string
  moonset: string
  sunrise: string
  sunset: string
  is_waxing: boolean
  next_phase: string
}

const DEFAULT_MOON: MoonData = {
  phase_emoji: "🌑",
  phase_name: "Unknown",
  phase_name_cat: "Desconeguda",
  illumination: "0",
  moonrise: "--:--",
  moonset: "--:--",
  sunrise: "--:--",
  sunset: "--:--",
  is_waxing: true,
  next_phase: "Unknown"
}

const PHASE_INFO: Record<string, { emoji: string, cat: string, next: string, waxing: boolean }> = {
  "New Moon": { emoji: "🌑", cat: "Lluna Nova", next: "Waxing Crescent", waxing: true },
  "Waxing Crescent": { emoji: "🌒", cat: "Lluna Creixent", next: "First Quarter", waxing: true },
  "First Quarter": { emoji: "🌓", cat: "Quart Creixent", next: "Waxing Gibbous", waxing: true },
  "Waxing Gibbous": { emoji: "🌔", cat: "Lluna Gibosa Creixent", next: "Full Moon", waxing: true },
  "Full Moon": { emoji: "🌕", cat: "Lluna Plena", next: "Waning Gibbous", waxing: false },
  "Waning Gibbous": { emoji: "🌖", cat: "Lluna Gibosa Minvant", next: "Last Quarter", waxing: false },
  "Last Quarter": { emoji: "🌗", cat: "Quart Minvant", next: "Waning Crescent", waxing: false },
  "Waning Crescent": { emoji: "🌘", cat: "Lluna Minvant", next: "New Moon", waxing: false }
}

const [state, setMoon] = createState<MoonData>(DEFAULT_MOON)
export const moonService = state

async function updateMoon() {
  try {
    // Afegim -m 10 per evitar que curl es quedi penjat si la xarxa no respon
    const out = await execAsync('bash -c "curl -s -m 10 \'wttr.in/?format=j1\'"')
    const data = JSON.parse(out)
    const astro = data.weather[0].astronomy[0]
    const phase = astro.moon_phase
    const info = PHASE_INFO[phase] || PHASE_INFO["New Moon"]
    
    setMoon({
      phase_emoji: info.emoji,
      phase_name: phase,
      phase_name_cat: info.cat,
      illumination: astro.moon_illumination,
      moonrise: astro.moonrise,
      moonset: astro.moonset,
      sunrise: astro.sunrise,
      sunset: astro.sunset,
      is_waxing: info.waxing,
      next_phase: PHASE_INFO[info.next]?.cat || info.next
    })
    
    // Si ha anat bé, actualitzem cada hora
    setTimeout(updateMoon, 3600000)
  } catch (e) {
    // Si falla (segurament per falta d'internet a l'inici), reintentem cada 10 segons
    console.error("Moon Service Error (retrying in 10s):", e)
    setTimeout(updateMoon, 10000)
  }
}

// Primera crida
updateMoon()
