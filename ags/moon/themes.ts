export interface Theme {
  name: string
  colors: {
    base: string
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
    text: "#cdd6f4",
    subtext0: "#bac2de",
    blue: "#89b4fa",
    green: "#a6e3a1",
    mauve: "#cba6f7",
    surface0: "#313244",
    red: "#f38ba8",
    yellow: "#f9e2af",
    popover_bg: "#0b0b12",
  },
}

export const nord: Theme = {
  name: "Nord",
  colors: {
    base: "#2e3440",
    text: "#eceff4",
    subtext0: "#d8dee9",
    blue: "#81a1c1",
    green: "#a3be8c",
    mauve: "#b48ead",
    surface0: "#3b4252",
    red: "#bf616a",
    yellow: "#ebcb8b",
    popover_bg: "#242933",
  },
}

export const gruvbox: Theme = {
  name: "Gruvbox",
  colors: {
    base: "#282828",
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

export const themes = [catppuccin, nord, gruvbox]
