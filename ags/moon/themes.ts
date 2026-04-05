export interface BarPreset {
  name: string
  fontSize: string
  showSeparators: boolean
  
  // Bar Container (bar-inner)
  innerBarBg: string
  innerBarBorder: string
  innerBarRadius: number
  innerBarMargin: string
  innerBarPadding: string
  
  // Buttons (innerButton)
  buttonBg: string
  buttonFg: string
  buttonHoverBg: string
  buttonRadius: string
  buttonPadding: string
  buttonBorder: string
  buttonShadow: string
  buttonSpacing: number

  // Legacy/Reference
  transparent: boolean
  border: boolean
  buttonStyle: "pill" | "square" | "subtle" | "outline" | "glass"
}

export const barPresets: BarPreset[] = [
  {
    name: "Ethereal Glass",
    fontSize: "11px",
    showSeparators: false,
    innerBarBg: "rgba(30, 30, 46, 0.4)",
    innerBarBorder: "1px solid rgba(255, 255, 255, 0.1)",
    innerBarRadius: 16,
    innerBarMargin: "10px 20px",
    innerBarPadding: "0 12px",
    buttonBg: "rgba(255, 255, 255, 0.03)",
    buttonFg: "var(--button-fg)",
    buttonHoverBg: "rgba(255, 255, 255, 0.08)",
    buttonRadius: "12px",
    buttonPadding: "0 12px",
    buttonBorder: "1px solid rgba(255, 255, 255, 0.08)",
    buttonShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.05)",
    buttonSpacing: 1,
    transparent: true,
    border: true,
    buttonStyle: "glass"
  },
  {
    name: "Cyberpunk Edge",
    fontSize: "12px",
    showSeparators: true,
    innerBarBg: "var(--base)",
    innerBarBorder: "1px solid var(--accent)",
    innerBarRadius: 0,
    innerBarMargin: "0px",
    innerBarPadding: "0 10px",
    buttonBg: "transparent",
    buttonFg: "var(--accent)",
    buttonHoverBg: "var(--accent)",
    buttonRadius: "0px",
    buttonPadding: "0 10px",
    buttonBorder: "1px solid var(--accent)",
    buttonShadow: "none",
    buttonSpacing: 0,
    transparent: false,
    border: true,
    buttonStyle: "outline"
  },
  {
    name: "Minimal Floating",
    fontSize: "11px",
    showSeparators: false,
    innerBarBg: "var(--base)",
    innerBarBorder: "none",
    innerBarRadius: 30,
    innerBarMargin: "12px 100px",
    innerBarPadding: "0 20px",
    buttonBg: "var(--surface)",
    buttonFg: "var(--text)",
    buttonHoverBg: "var(--overlay)",
    buttonRadius: "24px",
    buttonPadding: "0 14px",
    buttonBorder: "none",
    buttonShadow: "none",
    buttonSpacing: 16,
    transparent: false,
    border: false,
    buttonStyle: "pill"
  },
  {
    name: "Classic Desktop",
    fontSize: "11px",
    showSeparators: true,
    innerBarBg: "var(--base)",
    innerBarBorder: "1px solid var(--border)",
    innerBarRadius: 6,
    innerBarMargin: "4px 8px",
    innerBarPadding: "0 10px",
    buttonBg: "var(--button-bg)",
    buttonFg: "var(--button-fg)",
    buttonHoverBg: "var(--overlay)",
    buttonRadius: "4px",
    buttonPadding: "0 10px",
    buttonBorder: "none",
    buttonShadow: "none",
    buttonSpacing: 4,
    transparent: false,
    border: true,
    buttonStyle: "square"
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
