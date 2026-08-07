local wezterm = require "wezterm"
local config = {}

config.enable_scroll_bar = true
config.window_background_opacity = 1
config.hide_tab_bar_if_only_one_tab = true
config.font = wezterm.font 'JetBrains Mono'

config.colors = {
  background = "#171311",
  foreground = "#e6d5c2",
  cursor_bg = "#ea9875",
  cursor_fg = "#171311",
  cursor_border = "#ea9875",
  selection_bg = "#2f1e17",
  selection_fg = "#e6d5c2",
  compose_cursor = "#f4a21c",
  scrollbar_thumb = "#362f2c",
  split = "#362f2c",
  ansi = {
    "#201b19",
    "#d1766e",
    "#99af6b",
    "#fcba81",
    "#58bdff",
    "#9480ba",
    "#4e89a2",
    "#a09384",
  },
  brights = {
    "#73665b",
    "#d25780",
    "#43b16a",
    "#f4a21c",
    "#8bcfff",
    "#a692cd",
    "#20c9cb",
    "#e6d5c2",
  },
  tab_bar = {
    background = "#0f0c0a",
    active_tab = {
      bg_color = "#171311",
      fg_color = "#e6d5c2",
    },
    inactive_tab = {
      bg_color = "#0f0c0a",
      fg_color = "#73665b",
    },
    inactive_tab_hover = {
      bg_color = "#201b19",
      fg_color = "#a09384",
    },
    new_tab = {
      bg_color = "#0f0c0a",
      fg_color = "#73665b",
    },
    new_tab_hover = {
      bg_color = "#201b19",
      fg_color = "#a09384",
    },
  },
}

return config
