export interface BarPreset {
  name: string
  transparent: boolean
  borderRadius: number
  margin: string
  border: boolean
  padding: string
}

export const barPresets: BarPreset[] = [
  {
    name: "Floating Pill",
    transparent: false,
    borderRadius: 20,
    margin: "8px 16px",
    border: true,
    padding: "0 16px"
  },
  {
    name: "Modern Flat",
    transparent: false,
    borderRadius: 8,
    margin: "4px 10px",
    border: true,
    padding: "0 12px"
  },
  {
    name: "Glass Minimal",
    transparent: true,
    borderRadius: 0,
    margin: "0",
    border: false,
    padding: "0 10px"
  },
  {
    name: "Compact Square",
    transparent: false,
    borderRadius: 2,
    margin: "2px 4px",
    border: true,
    padding: "0 8px"
  }
]

export interface Theme {
  name: string
  colors: {
    base: string
    bg: string
    text: string
    subtext0: string
    blue: string
    green: string
    mauve: string
    surface0: string
    red: string
    yellow: string
  }
}

export const themes: Theme[] = [
  {
    name: "Catppuccin Mocha",
    colors: {
      base: "#1e1e2e",
      bg: "rgba(30, 30, 46, 0.85)",
      text: "#cdd6f4",
      subtext0: "#bac2de",
      blue: "#89b4fa",
      green: "#a6e3a1",
      mauve: "#cba6f7",
      surface0: "#313244",
      red: "#f38ba8",
      yellow: "#f9e2af",
    }
  },
  {
    name: "Tokyo Night",
    colors: {
      base: "#1a1b26",
      bg: "rgba(26, 27, 38, 0.85)",
      text: "#cfc9c2",
      subtext0: "#a9b1d6",
      blue: "#7aa2f7",
      green: "#9ece6a",
      mauve: "#bb9af7",
      surface0: "#414868",
      red: "#f7768e",
      yellow: "#e0af68",
    }
  },
]
