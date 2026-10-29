-- Arch Linux + Hyprland 0.55+ configuration.
-- chezmoi init only clones this file; apply it explicitly after reviewing the diff.

local ENABLE_AUTOSTART = true
local ENABLE_WAYBAR_AUTOSTART = true
local ENABLE_WALLPAPER_AUTOSTART = true

local terminal = "kitty"
local launcher = "fuzzel"
local browser = "firefox"
local file_manager = "thunar"
local screenshot_dir = "$HOME/Pictures/Screenshots"

-- Environment for Wayland applications and XDG portal selection.
hl.env("XDG_CURRENT_DESKTOP", "Hyprland")
hl.env("XDG_SESSION_DESKTOP", "Hyprland")
hl.env("XDG_SESSION_TYPE", "wayland")
hl.env("QT_QPA_PLATFORM", "wayland;xcb")
hl.env("MOZ_ENABLE_WAYLAND", "1")

hl.config({
  general = {
    gaps_in = 4,
    gaps_out = 2,
    border_size = 2,
    layout = "dwindle",
    resize_on_border = true,
    col = {
      active_border = { colors = { "rgba(f5c2e7ff)" }, angle = 0 },
      inactive_border = { colors = { "rgba(45475aff)" }, angle = 0 },
    },
  },
  input = {
    kb_layout = "es",
    kb_options = "grp:alt_shift_toggle,caps:escape",
    repeat_delay = 250,
    repeat_rate = 30,
    follow_mouse = 1,
    touchpad = {
      tap_to_click = true,
      natural_scroll = true,
      disable_while_typing = true,
      clickfinger_behavior = true,
      scroll_factor = 0.5,
    },
  },
  decoration = {
    rounding = 0,
  },
  dwindle = {
    preserve_split = true,
    smart_split = true,
  },
  misc = {
    disable_hyprland_logo = true,
    disable_splash_rendering = true,
  },
})

-- Preserve Sway workspace intent while using Hyprland's window rules.
local workspace_rules = {
  { class = "^(Code|code-url-handler|jetbrains-.*|Cursor)$", workspace = "2" },
  { class = "^(firefox|Google-chrome|Chromium|brave-browser|Opera|zen)$", workspace = "3" },
  { class = "^(obsidian|libreoffice.*)$", workspace = "4" },
  { class = "^(Slack|discord|TelegramDesktop)$", workspace = "5" },
  { class = "^(mpv|Spotify|org.gnome.Rhythmbox3)$", workspace = "6" },
}

for _, rule in ipairs(workspace_rules) do
  local class = rule.class
  local workspace = rule.workspace
  hl.window_rule({ match = { class = class }, workspace = workspace })
end

hl.window_rule({ match = { modal = true }, float = true, center = true })
hl.window_rule({ match = { class = "^(gnome-calculator|gnome-system-monitor|pavucontrol|nm-connection-editor|blueman-manager)$" }, float = true, center = true })
hl.window_rule({ match = { class = "^(pinentry|floating)$" }, float = true, center = true })
hl.window_rule({ match = { class = "^firefox$", title = ".*Picture-in-Picture.*" }, float = true, pin = true })
hl.window_rule({ match = { class = "^mpv$" }, float = true, pin = true, size = { 640, 360 }, center = true })
hl.window_rule({ match = { class = "^steam$", title = "^(Friends List|Steam - News|.* - Chat)$" }, float = true })
hl.window_rule({ match = { class = "^zoom$", title = "^(zoom|Choose ONE of the audio conference options)$" }, float = true, center = true })

local function bind(keys, dispatcher, description)
  hl.bind(keys, dispatcher, { description = description })
end

-- Applications
bind("SUPER + Return", hl.dsp.exec_cmd(terminal), "Terminal")
bind("SUPER + SHIFT + Return", hl.dsp.exec_cmd(terminal .. " --class floating", { float = true, center = true }), "Floating terminal")
bind("SUPER + D", hl.dsp.exec_cmd(launcher), "Application launcher")
bind("SUPER + SHIFT + D", hl.dsp.exec_cmd(launcher), "Application launcher")
bind("SUPER + SHIFT + B", hl.dsp.exec_cmd(browser), "Browser")
bind("SUPER + SHIFT + F", hl.dsp.exec_cmd(file_manager), "File manager")
bind("SUPER + SHIFT + Q", hl.dsp.window.close(), "Close focused window")
bind("SUPER + SHIFT + C", hl.dsp.reload_config(), "Reload Hyprland configuration")

-- Focus and move windows. Both Vim keys and arrows keep the Sway muscle memory.
for key, direction in pairs({ H = "l", J = "d", K = "u", L = "r" }) do
  bind("SUPER + " .. key, hl.dsp.focus({ direction = direction }), "Focus " .. direction)
  bind("SUPER + SHIFT + " .. key, hl.dsp.window.move({ direction = direction }), "Move window " .. direction)
end

for key, direction in pairs({ left = "l", down = "d", up = "u", right = "r" }) do
  bind("SUPER + " .. key, hl.dsp.focus({ direction = direction }), "Focus " .. direction)
  bind("SUPER + SHIFT + " .. key, hl.dsp.window.move({ direction = direction }), "Move window " .. direction)
end

bind("SUPER + C", hl.dsp.window.center(), "Center floating window")
bind("SUPER + SHIFT + SPACE", hl.dsp.window.float(), "Toggle floating")
bind("SUPER + F", hl.dsp.window.fullscreen(), "Toggle fullscreen")
bind("SUPER + SPACE", function()
  local window = hl.get_active_window()
  if window == nil then
    return
  end
  if window.floating then
    hl.dispatch(hl.dsp.focus({ window = "tiled" }))
  else
    hl.dispatch(hl.dsp.focus({ window = "floating" }))
  end
end, "Switch focus between tiled and floating windows")

-- The native equivalent of Sway's resize mode, with coarse and fine control.
bind("SUPER + R", hl.dsp.submap("resize"), "Enter resize mode")
hl.define_submap("resize", function()
  local resize_binds = {
    { "h", -10, 0 }, { "j", 0, 10 }, { "k", 0, -10 }, { "l", 10, 0 },
    { "left", -10, 0 }, { "down", 0, 10 }, { "up", 0, -10 }, { "right", 10, 0 },
  }
  for _, item in ipairs(resize_binds) do
    hl.bind(item[1], hl.dsp.window.resize({ x = item[2], y = item[3], relative = true }), { repeating = true })
    hl.bind("SHIFT + " .. item[1], hl.dsp.window.resize({ x = item[2] / 10, y = item[3] / 10, relative = true }), { repeating = true })
  end
  hl.bind("Return", hl.dsp.submap("reset"))
  hl.bind("Escape", hl.dsp.submap("reset"))
  hl.bind("SUPER + R", hl.dsp.submap("reset"))
end)

-- Layouts: Hyprland has no Sway stacking layout. Groups approximate tabbed
-- containers; Dwindle split direction applies to the next window.
bind("SUPER + W", hl.dsp.group.toggle(), "Toggle a window group")
bind("SUPER + B", hl.dsp.layout("preselect r"), "Preselect a horizontal split")
bind("SUPER + V", hl.dsp.layout("preselect b"), "Preselect a vertical split")

local active_layout = "dwindle"
bind("SUPER + E", function()
  active_layout = active_layout == "dwindle" and "master" or "dwindle"
  hl.config({ general = { layout = active_layout } })
end, "Toggle Dwindle/Master layout")

-- Workspaces 1-10, matching Sway's 1-9/0 convention.
for key, workspace in pairs({ ["1"] = 1, ["2"] = 2, ["3"] = 3, ["4"] = 4, ["5"] = 5, ["6"] = 6, ["7"] = 7, ["8"] = 8, ["9"] = 9, ["0"] = 10 }) do
  bind("SUPER + " .. key, hl.dsp.focus({ workspace = workspace }), "Switch to workspace " .. workspace)
  bind("SUPER + SHIFT + " .. key, hl.dsp.window.move({ workspace = workspace }), "Move window to workspace " .. workspace)
  bind("SUPER + CTRL + " .. key, hl.dsp.window.move({ workspace = workspace, follow = true }), "Move window and follow to workspace " .. workspace)
end

for key, workspace in pairs({ KP_1 = 1, KP_2 = 2, KP_3 = 3, KP_4 = 4, KP_5 = 5, KP_6 = 6, KP_7 = 7, KP_8 = 8, KP_9 = 9, KP_0 = 10 }) do
  bind("SUPER + " .. key, hl.dsp.focus({ workspace = workspace }), "Switch to workspace " .. workspace)
  bind("SUPER + SHIFT + " .. key, hl.dsp.window.move({ workspace = workspace }), "Move window to workspace " .. workspace)
  bind("SUPER + CTRL + " .. key, hl.dsp.window.move({ workspace = workspace, follow = true }), "Move window and follow to workspace " .. workspace)
end

bind("SUPER + TAB", hl.dsp.focus({ workspace = "e+1" }), "Next workspace")
bind("SUPER + SHIFT + TAB", hl.dsp.focus({ workspace = "e-1" }), "Previous workspace")
bind("SUPER + bracketright", hl.dsp.focus({ workspace = "e+1" }), "Next workspace")
bind("SUPER + bracketleft", hl.dsp.focus({ workspace = "e-1" }), "Previous workspace")
bind("SUPER + M", hl.dsp.focus({ workspace = "previous" }), "Return to previous workspace")
bind("SUPER + SHIFT + M", hl.dsp.window.move({ workspace = "previous" }), "Move window to previous workspace")
for key, direction in pairs({ left = "l", right = "r", up = "u", down = "d" }) do
  bind("SUPER + CTRL + SHIFT + " .. key, hl.dsp.workspace.move({ monitor = direction }), "Move workspace to output " .. direction)
end
bind("SUPER + SHIFT + F7", hl.dsp.workspace.move({ monitor = "l" }), "Move workspace to left output")
bind("SUPER + SHIFT + F8", hl.dsp.workspace.move({ monitor = "r" }), "Move workspace to right output")

-- Display-dependent Sway profiles (Super+F7 and Super+P) are intentionally
-- omitted until the Arch machine's output names are confirmed with `hyprctl monitors all`.

-- Audio and media keys use PipeWire's wpctl. pactl remains available through
-- pipewire-pulse, but wpctl avoids adding another control dependency.
bind("XF86AudioRaiseVolume", hl.dsp.exec_cmd("wpctl set-volume -l 1.5 @DEFAULT_AUDIO_SINK@ 5%+"), "Volume up")
bind("XF86AudioLowerVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-"), "Volume down")
bind("SHIFT + XF86AudioRaiseVolume", hl.dsp.exec_cmd("wpctl set-volume -l 1.5 @DEFAULT_AUDIO_SINK@ 1%+"), "Volume up slightly")
bind("SHIFT + XF86AudioLowerVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 1%-"), "Volume down slightly")
bind("XF86AudioMute", hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"), "Mute audio")
bind("XF86AudioMicMute", hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SOURCE@ toggle"), "Mute microphone")
bind("XF86MonBrightnessUp", hl.dsp.exec_cmd("brightnessctl set 5%+"), "Brightness up")
bind("XF86MonBrightnessDown", hl.dsp.exec_cmd("brightnessctl set 5%-"), "Brightness down")
bind("SHIFT + XF86MonBrightnessUp", hl.dsp.exec_cmd("brightnessctl set 1%+"), "Brightness up slightly")
bind("SHIFT + XF86MonBrightnessDown", hl.dsp.exec_cmd("brightnessctl set 1%-"), "Brightness down slightly")
bind("XF86AudioPlay", hl.dsp.exec_cmd("playerctl play-pause"), "Play/pause")
bind("XF86AudioPause", hl.dsp.exec_cmd("playerctl play-pause"), "Play/pause")
bind("XF86AudioNext", hl.dsp.exec_cmd("playerctl next"), "Next track")
bind("XF86AudioPrev", hl.dsp.exec_cmd("playerctl previous"), "Previous track")
bind("XF86AudioStop", hl.dsp.exec_cmd("playerctl stop"), "Stop playback")

-- Screenshots run on demand; cliphist watchers start with the session below.
bind("Print", hl.dsp.exec_cmd("mkdir -p " .. screenshot_dir .. " && grim " .. screenshot_dir .. "/$(date +%Y-%m-%d-%H%M%S).png"), "Save full-screen screenshot")
bind("SUPER + PRINT", hl.dsp.submap("screenshot"), "Screenshot menu")
bind("SUPER + SHIFT + S", hl.dsp.exec_cmd("grim -g \"$(slurp)\" - | wl-copy"), "Copy selected area")
bind("SUPER + SHIFT + V", hl.dsp.exec_cmd('selection=$(cliphist list | fuzzel --dmenu) && [ -n "$selection" ] && printf "%s\\n" "$selection" | cliphist decode | wl-copy'), "Clipboard history")
bind("SUPER + ALT + W", hl.dsp.exec_cmd("$HOME/.local/bin/pm-wallpaper next"), "Next wallpaper")
bind("SUPER + ALT + SHIFT + W", hl.dsp.exec_cmd("$HOME/.local/bin/pm-wallpaper select"), "Select wallpaper")

hl.define_submap("screenshot", function()
  local function screenshot(command)
    hl.dispatch(hl.dsp.exec_cmd(command))
    hl.dispatch(hl.dsp.submap("reset"))
  end
  local active_window_geometry = [["$(hyprctl activewindow -j | jq -r '"\(.at[0]),\(.at[1]) \(.size[0])x\(.size[1])"')"]]
  hl.bind("s", function() screenshot("mkdir -p " .. screenshot_dir .. " && grim " .. screenshot_dir .. "/$(date +%Y-%m-%d-%H%M%S).png") end)
  hl.bind("a", function() screenshot("mkdir -p " .. screenshot_dir .. " && grim -g \"$(slurp)\" " .. screenshot_dir .. "/$(date +%Y-%m-%d-%H%M%S).png") end)
  hl.bind("w", function() screenshot("mkdir -p " .. screenshot_dir .. " && grim -g " .. active_window_geometry .. " " .. screenshot_dir .. "/$(date +%Y-%m-%d-%H%M%S).png") end)
  hl.bind("SHIFT + A", function() screenshot("grim -g \"$(slurp)\" - | wl-copy") end)
  hl.bind("Return", hl.dsp.submap("reset"))
  hl.bind("Escape", hl.dsp.submap("reset"))
end)

-- Show a selectable menu instead of running power actions from a submap.
-- Reboot and shutdown require a second confirmation; logout is not offered.
bind("SUPER + SHIFT + E", hl.dsp.exec_cmd("$HOME/.local/bin/pm-power-menu"), "Open power menu")

-- Waybar starts with the selected config and stylesheet, not system defaults.
if ENABLE_WAYBAR_AUTOSTART then
  hl.on("hyprland.start", function()
    hl.exec_cmd('waybar --config "$HOME/.config/waybar/config" --style "$HOME/.config/waybar/style.css"')
  end)
end

-- Arch desktop services. NetworkManager, Bluetooth and audio daemons themselves
-- are system services; only their user applets/agents run in this session.
if ENABLE_AUTOSTART then
  hl.on("hyprland.start", function()
    hl.exec_cmd("dbus-update-activation-environment --systemd --all")
    if ENABLE_WALLPAPER_AUTOSTART then
      hl.exec_cmd("hyprpaper")
      hl.exec_cmd("$HOME/.local/bin/pm-wallpaper restore")
    end
    hl.exec_cmd("hypridle")
    hl.exec_cmd("mako")
    hl.exec_cmd("nm-applet --indicator")
    hl.exec_cmd("blueman-applet")
    hl.exec_cmd("systemctl --user start hyprpolkitagent.service")
    hl.exec_cmd("wl-paste --type text --watch cliphist store")
    hl.exec_cmd("wl-paste --type image --watch cliphist store")
    hl.exec_cmd('gsettings set org.gnome.desktop.interface gtk-theme "Adwaita-dark"')
    hl.exec_cmd('gsettings set org.gnome.desktop.interface icon-theme "Papirus-Dark"')
    hl.exec_cmd('gsettings set org.gnome.desktop.interface cursor-theme "Adwaita"')
    hl.exec_cmd('gsettings set org.gnome.desktop.interface font-name "Noto Sans 11"')
  end)
end
