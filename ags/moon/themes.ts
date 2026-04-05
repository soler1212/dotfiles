export interface Theme {
  name: string
  colors: {
    base: string
    bg: string // Fons de la barra amb transparència
    text: string
    subtext0: string
    blue: string
    green: string
    mauve: string
    surface0: string
    red: string
    yellow: string
    popover_bg: string
  }
}

export const catppuccin: Theme = {
  name: "Catppuccin",
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
    popover_bg: "#1e1e2e",
  },
}

export const nord: Theme = {
  name: "Nord",
  colors: {
    base: "#2e3440",
    bg: "rgba(46, 52, 64, 0.85)",
    text: "#eceff4",
    subtext0: "#d8dee9",
    blue: "#81a1c1",
    green: "#a3be8c",
    mauve: "#b48ead",
    surface0: "#3b4252",
    red: "#bf616a",
    yellow: "#ebcb8b",
    popover_bg: "#2e3440",
  },
}

export const hacker: Theme = {
  name: "Hacker",
  colors: {
    base: "#0d0d0d",
    bg: "rgba(13, 13, 13, 0.9)",
    text: "#00ff41",
    subtext0: "#008f11",
    blue: "#003b00",
    green: "#00ff41",
    mauve: "#00ff41",
    surface0: "#1a1a1a",
    red: "#ff0000",
    yellow: "#ccff00",
    popover_bg: "#050505",
  },
}

export const radical: Theme = {
  name: "Radical",
  colors: {
    base: "#141321",
    bg: "rgba(20, 19, 33, 0.85)",
    text: "#a9fef7",
    subtext0: "#54607e",
    blue: "#1a8fff",
    green: "#b6f584",
    mauve: "#ff47ee",
    surface0: "#201e33",
    red: "#fe5a5a",
    yellow: "#ffe64d",
    popover_bg: "#0b0a14",
  },
}

export const minimal: Theme = {
  name: "Minimal",
  colors: {
    base: "#ffffff",
    bg: "rgba(255, 255, 255, 0.95)",
    text: "#000000",
    subtext0: "#777777",
    blue: "#333333",
    green: "#555555",
    mauve: "#222222",
    surface0: "#f0f0f0",
    red: "#000000",
    yellow: "#999999",
    popover_bg: "#ffffff",
  },
}

export const bubbles: Theme = {
  name: "Bubbles",
  colors: {
    base: "#f3f0ff",
    bg: "rgba(243, 240, 255, 0.85)",
    text: "#4c4f69",
    subtext0: "#7c7f93",
    blue: "#04a5e5",
    green: "#40a02b",
    mauve: "#8839ef",
    surface0: "#e6e9ef",
    red: "#d20f39",
    yellow: "#df8e1d",
    popover_bg: "#ffffff",
  },
}

export const contrast: Theme = {
  name: "Contrast",
  colors: {
    base: "#000000",
    bg: "rgba(0, 0, 0, 0.95)",
    text: "#ffffff",
    subtext0: "#aaaaaa",
    blue: "#0000ff",
    green: "#00ff00",
    mauve: "#ff00ff",
    surface0: "#333333",
    red: "#ff0000",
    yellow: "#ffff00",
    popover_bg: "#000000",
  },
}

export const gruvbox: Theme = {
  name: "Gruvbox",
  colors: {
    base: "#282828",
    bg: "rgba(40, 40, 40, 0.85)",
    text: "#ebdbb2",
    subtext0: "#a89984",
    blue: "#458588",
    green: "#98971a",
    mauve: "#b16286",
    surface0: "#3c3836",
    red: "#cc241d",
    yellow: "#d79921",
    popover_bg: "#1d2021",
  },
}

export const themes = [catppuccin, nord, gruvbox, hacker, radical, minimal, bubbles, contrast]
