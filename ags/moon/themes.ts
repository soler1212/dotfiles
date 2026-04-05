export interface BarPreset {
  name: string
  transparent: boolean
  borderRadius: number
  margin: string
  border: boolean
  padding: string
  buttonStyle: "pill" | "square" | "subtle" | "outline"
  spacing: number
}

export const barPresets: BarPreset[] = [
  {
    name: "Floating Pill",
    transparent: false,
    borderRadius: 24,
    margin: "8px 16px",
    border: true,
    padding: "0 16px",
    buttonStyle: "pill",
    spacing: 8
  },
  {
    name: "Modern Flat",
    transparent: false,
    borderRadius: 8,
    margin: "4px 10px",
    border: true,
    padding: "0 12px",
    buttonStyle: "square",
    spacing: 6
  },
  {
    name: "Glass Minimal",
    transparent: true,
    borderRadius: 0,
    margin: "0px",
    border: false,
    padding: "0 10px",
    buttonStyle: "subtle",
    spacing: 4
  },
  {
    name: "Cyber Outline",
    transparent: true,
    borderRadius: 4,
    margin: "6px 12px",
    border: true,
    padding: "0 14px",
    buttonStyle: "outline",
    spacing: 10
  },
  {
    name: "Compact Dock",
    transparent: false,
    borderRadius: 12,
    margin: "4px 100px", // Replaced 20% with pixels
    border: true,
    padding: "0 12px",
    buttonStyle: "pill",
    spacing: 4
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
    peach: string
    lavender: string
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
      peach: "#fab387",
      lavender: "#b4befe",
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
      peach: "#ff9e64",
      lavender: "#9d7cd8",
    }
  },
  {
    name: "Nordic Frost",
    colors: {
      base: "#2e3440",
      bg: "rgba(46, 52, 64, 0.9)",
      text: "#eceff4",
      subtext0: "#d8dee9",
      blue: "#88c0d0",
      green: "#a3be8c",
      mauve: "#b48ead",
      surface0: "#3b4252",
      red: "#bf616a",
      yellow: "#ebcb8b",
      peach: "#d08770",
      lavender: "#81a1c1",
    }
  },
  {
    name: "Everforest Dark",
    colors: {
      base: "#2d353b",
      bg: "rgba(45, 53, 59, 0.9)",
      text: "#d3c6aa",
      subtext0: "#a7b0a0",
      blue: "#7fbbb3",
      green: "#a7c080",
      mauve: "#d699b6",
      surface0: "#343f44",
      red: "#e67e80",
      yellow: "#dbbc7f",
      peach: "#e69875",
      lavender: "#83c092",
    }
  },
  {
    name: "Rose Pine",
    colors: {
      base: "#191724",
      bg: "rgba(25, 23, 36, 0.85)",
      text: "#e0def4",
      subtext0: "#908caa",
      blue: "#31748f",
      green: "#9ccfd8",
      mauve: "#c4a7e7",
      surface0: "#26233a",
      red: "#eb6f92",
      yellow: "#f6c177",
      peach: "#ebbcba",
      lavender: "#c4a7e7",
    }
  },
  {
    name: "Dracula",
    colors: {
      base: "#282a36",
      bg: "rgba(40, 42, 54, 0.9)",
      text: "#f8f8f2",
      subtext0: "#6272a4",
      blue: "#8be9fd",
      green: "#50fa7b",
      mauve: "#bd93f9",
      surface0: "#44475a",
      red: "#ff5555",
      yellow: "#f1fa8c",
      peach: "#ffb86c",
      lavender: "#ff79c6",
    }
  }
]
