export interface BarPreset {
  name: string
  transparent: boolean
  borderRadius: number
  margin: string
  border: boolean
  padding: string
  buttonStyle: "pill" | "square" | "subtle" | "outline" | "glass"
  spacing: number
  showSeparators: boolean
}

export const barPresets: BarPreset[] = [
  {
    name: "Ethereal Glass",
    transparent: true,
    borderRadius: 16,
    margin: "10px 20px",
    border: true,
    padding: "0 12px",
    buttonStyle: "glass",
    spacing: 12,
    showSeparators: false
  },
  {
    name: "Cyberpunk Edge",
    transparent: false,
    borderRadius: 0,
    margin: "0px",
    border: true,
    padding: "0 10px",
    buttonStyle: "outline",
    spacing: 0,
    showSeparators: true
  },
  {
    name: "Minimal Floating",
    transparent: false,
    borderRadius: 30,
    margin: "12px 100px",
    border: false,
    padding: "0 20px",
    buttonStyle: "pill",
    spacing: 16,
    showSeparators: false
  },
  {
    name: "Classic Desktop",
    transparent: false,
    borderRadius: 6,
    margin: "4px 8px",
    border: true,
    padding: "0 10px",
    buttonStyle: "square",
    spacing: 4,
    showSeparators: true
  }
]

export interface Theme {
  name: string
  colors: {
    // Core
    base: string
    surface: string
    overlay: string
    text: string
    subtext: string
    
    // UI
    accent: string
    accent_fg: string
    header: string
    button_bg: string
    button_fg: string
    border: string
    
    // Status
    red: string
    green: string
    yellow: string
    blue: string
    magenta: string
    orange: string
  }
}

export const themes: Theme[] = [
  {
    name: "Mocha Dream",
    colors: {
      base: "#1e1e2e",
      surface: "#181825",
      overlay: "#313244",
      text: "#cdd6f4",
      subtext: "#a6adc8",
      accent: "#cba6f7",
      accent_fg: "#11111b",
      header: "#f5c2e7",
      button_bg: "#313244",
      button_fg: "#cdd6f4",
      border: "rgba(203, 166, 247, 0.15)",
      red: "#f38ba8",
      green: "#a6e3a1",
      yellow: "#f9e2af",
      blue: "#89b4fa",
      magenta: "#f5c2e7",
      orange: "#fab387",
    }
  },
  {
    name: "Tokyo Midnight",
    colors: {
      base: "#1a1b26",
      surface: "#16161e",
      overlay: "#24283b",
      text: "#a9b1d6",
      subtext: "#787c99",
      accent: "#7aa2f7",
      accent_fg: "#1a1b26",
      header: "#bb9af7",
      button_bg: "#24283b",
      button_fg: "#a9b1d6",
      border: "rgba(122, 162, 247, 0.2)",
      red: "#f7768e",
      green: "#9ece6a",
      yellow: "#e0af68",
      blue: "#7aa2f7",
      magenta: "#bb9af7",
      orange: "#ff9e64",
    }
  },
  {
    name: "Deep Forest",
    colors: {
      base: "#1b1f23",
      surface: "#23282e",
      overlay: "#2d333b",
      text: "#adbac7",
      subtext: "#768390",
      accent: "#6cb6ff",
      accent_fg: "#1b1f23",
      header: "#f69d50",
      button_bg: "#2d333b",
      button_fg: "#adbac7",
      border: "rgba(108, 182, 255, 0.15)",
      red: "#f47067",
      green: "#57ab5a",
      yellow: "#c69026",
      blue: "#539bf5",
      magenta: "#b392f0",
      orange: "#e36209",
    }
  },
  {
    name: "Cyber Neon",
    colors: {
      base: "#0d0d17",
      surface: "#1a1a2e",
      overlay: "#2a2a4e",
      text: "#ffffff",
      subtext: "#94a3b8",
      accent: "#00f2ff",
      accent_fg: "#0d0d17",
      header: "#ff00ea",
      button_bg: "#1a1a2e",
      button_fg: "#00f2ff",
      border: "#00f2ff",
      red: "#ff0055",
      green: "#00ff99",
      yellow: "#ffee00",
      blue: "#00f2ff",
      magenta: "#ff00ea",
      orange: "#ff9900",
    }
  }
]
