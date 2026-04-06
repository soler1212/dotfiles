import { createPoll } from "ags/time"

export interface MoonData {
  phase_emoji: string
  phase_name: string
  illumination: string
  moonrise: string
  moonset: string
}

const DEFAULT_MOON: MoonData = {
  phase_emoji: "🌑",
  phase_name: "Desconeguda",
  illumination: "0",
  moonrise: "--:--",
  moonset: "--:--"
}

const PHASE_EMOJIS: Record<string, string> = {
  "New Moon": "🌑",
  "Waxing Crescent": "🌒",
  "First Quarter": "🌓",
  "Waxing Gibbous": "🌔",
  "Full Moon": "🌕",
  "Waning Gibbous": "🌖",
  "Last Quarter": "🌗",
  "Waning Crescent": "🌘"
}

export const moonService = createPoll<MoonData>(
  DEFAULT_MOON,
  3600000,
  'bash -c "curl -s \'wttr.in/?format=j1\'"',
  (out) => {
    try {
      const data = JSON.parse(out)
      const astro = data.weather[0].astronomy[0]
      const phase = astro.moon_phase
      
      return {
        phase_emoji: PHASE_EMOJIS[phase] || "🌑",
        phase_name: phase,
        illumination: astro.moon_illumination,
        moonrise: astro.moonrise,
        moonset: astro.moonset
      }
    } catch (e) {
      console.error("Moon Service Error:", e)
      return DEFAULT_MOON
    }
  }
)
