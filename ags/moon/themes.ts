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
  innerBarHeight: number
  
  // Separator & Icons
  sepMarginV: number
  iconSize: number
  
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
    name: "Laptop Compact",
    fontSize: "9px",
    showSeparators: false,
    innerBarBg: "var(--base)",
    innerBarBorder: "1px solid var(--border)",
    innerBarRadius: 4,
    innerBarMargin: "0px",
    innerBarPadding: "0px 4px",
    innerBarHeight: 22,
    sepMarginV: 2,
    iconSize: 12,
    buttonBg: "transparent",
    buttonFg: "var(--text)",
    buttonHoverBg: "var(--overlay)",
    buttonRadius: "2px",
    buttonPadding: "0 4px",
    buttonBorder: "none",
    buttonShadow: "none",
    buttonSpacing: 1,
    transparent: false,
    border: true,
    buttonStyle: "subtle"
  },
  {
    name: "Ethereal Glass",
    fontSize: "11px",
    showSeparators: false,
    innerBarBg: "rgba(24, 24, 37, 0.45)",
    innerBarBorder: "1px solid rgba(255, 255, 255, 0.1)",
    innerBarRadius: 12,
    innerBarMargin: "8px 12px",
    innerBarPadding: "4px 8px",
    innerBarHeight: 32,
    sepMarginV: 8,
    iconSize: 15,
    buttonBg: "rgba(255, 255, 255, 0.04)",
    buttonFg: "var(--text)",
    buttonHoverBg: "rgba(255, 255, 255, 0.1)",
    buttonRadius: "8px",
    buttonPadding: "0 10px",
    buttonBorder: "1px solid rgba(255, 255, 255, 0.05)",
    buttonShadow: "none",
    buttonSpacing: 3,
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
    innerBarPadding: "2px 4px",
    innerBarHeight: 32,
    sepMarginV: 4,
    iconSize: 15,
    buttonBg: "transparent",
    buttonFg: "var(--accent)",
    buttonHoverBg: "rgba(0, 242, 255, 0.15)",
    buttonRadius: "0px",
    buttonPadding: "0 12px",
    buttonBorder: "1px solid transparent",
    buttonShadow: "none",
    buttonSpacing: 4,
    transparent: false,
    border: true,
    buttonStyle: "outline"
  },
  {
    name: "Minimal Floating",
    fontSize: "11px",
    showSeparators: false,
    innerBarBg: "var(--base)",
    innerBarBorder: "1px solid var(--border)",
    innerBarRadius: 24,
    innerBarMargin: "10px 80px",
    innerBarPadding: "4px 12px",
    innerBarHeight: 36,
    sepMarginV: 10,
    iconSize: 16,
    buttonBg: "var(--surface)",
    buttonFg: "var(--text)",
    buttonHoverBg: "var(--overlay)",
    buttonRadius: "20px",
    buttonPadding: "0 12px",
    buttonBorder: "none",
    buttonShadow: "0 2px 4px rgba(0,0,0,0.1)",
    buttonSpacing: 4,
    transparent: false,
    border: false,
    buttonStyle: "pill"
  },
  {
    name: "Classic Desktop",
    fontSize: "11px",
    showSeparators: true,
    innerBarBg: "var(--surface)",
    innerBarBorder: "1px solid var(--border)",
    innerBarRadius: 6,
    innerBarMargin: "2px 4px",
    innerBarPadding: "2px 6px",
    innerBarHeight: 30,
    sepMarginV: 6,
    iconSize: 14,
    buttonBg: "var(--overlay)",
    buttonFg: "var(--text)",
    buttonHoverBg: "var(--accent)",
    buttonRadius: "4px",
    buttonPadding: "0 8px",
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
    base: string
    surface: string
    overlay: string
    text: string
    subtext: string
    accent: string
    accent_fg: string
    header: string
    button_bg: string
    button_fg: string
    border: string
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
      surface: "#11111b",
      overlay: "#313244",
      text: "#cdd6f4",
      subtext: "#a6adc8",
      accent: "#cba6f7",
      accent_fg: "#11111b",
      header: "#f5c2e7",
      button_bg: "#313244",
      button_fg: "#cdd6f4",
      border: "rgba(203, 166, 247, 0.2)",
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
      border: "rgba(122, 162, 247, 0.25)",
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
      base: "#0d1117",
      surface: "#161b22",
      overlay: "#21262d",
      text: "#c9d1d9",
      subtext: "#8b949e",
      accent: "#58a6ff",
      accent_fg: "#0d1117",
      header: "#f0883e",
      button_bg: "#21262d",
      button_fg: "#c9d1d9",
      border: "rgba(240, 136, 62, 0.2)",
      red: "#ff7b72",
      green: "#3fb950",
      yellow: "#d29922",
      blue: "#58a6ff",
      magenta: "#bc8cff",
      orange: "#f0883e",
    }
  },
  {
    name: "Cyber Neon",
    colors: {
      base: "#050505",
      surface: "#0f0f0f",
      overlay: "#1a1a1a",
      text: "#ffffff",
      subtext: "#94a3b8",
      accent: "#00f2ff",
      accent_fg: "#000000",
      header: "#ff00ea",
      button_bg: "#1a1a1a",
      button_fg: "#00f2ff",
      border: "rgba(0, 242, 255, 0.5)",
      red: "#ff0055",
      green: "#00ff99",
      yellow: "#ffee00",
      blue: "#00f2ff",
      magenta: "#ff00ea",
      orange: "#ff9900",
    }
  }
]
