local wezterm = require "wezterm"
local config = {}

config.enable_scroll_bar = true
config.window_background_opacity = 1
config.hide_tab_bar_if_only_one_tab = true
config.font = wezterm.font 'JetBrains Mono'

config.colors = {
  background = "#1a1520",
  foreground = "#f5e6d3",
  cursor_bg = "#ff6b6b",
  cursor_fg = "#1a1520",
  cursor_border = "#ff6b6b",
  selection_bg = "#3d2a4d",
  selection_fg = "#f5e6d3",
  compose_cursor = "#ffd93d",
  scrollbar_thumb = "#5c4a6e",
  split = "#5c4a6e",
  ansi = {
    "#2d2438",
    "#ff6b6b",
    "#6bff6b",
    "#ffd93d",
    "#6bcfff",
    "#ff6bff",
    "#6bffff",
    "#f5e6d3",
  },
  brights = {
    "#8b7aa0",
    "#ff4757",
    "#2ed573",
    "#ffa502",
    "#1e90ff",
    "#ff6bcb",
    "#00d2d3",
    "#ffffff",
  },
  tab_bar = {
    background = "#0f0a14",
    active_tab = {
      bg_color = "#1a1520",
      fg_color = "#f5e6d3",
    },
    inactive_tab = {
      bg_color = "#0f0a14",
      fg_color = "#8b7aa0",
    },
    inactive_tab_hover = {
      bg_color = "#2d2438",
      fg_color = "#c5b8d9",
    },
    new_tab = {
      bg_color = "#0f0a14",
      fg_color = "#8b7aa0",
    },
    new_tab_hover = {
      bg_color = "#2d2438",
      fg_color = "#c5b8d9",
    },
  },
}

return config
