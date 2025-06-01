local wezterm = require "wezterm"
local config = {}

config.enable_scroll_bar = true
config.window_background_opacity = 0.88
config.hide_tab_bar_if_only_one_tab = true
config.font = wezterm.font 'JetBrains Mono'

return config
