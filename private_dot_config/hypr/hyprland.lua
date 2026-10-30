-- Arch Linux + Hyprland 0.55+ configuration.
-- Organized to follow the official example while keeping this machine's settings.

------------------
--- MONITORS ----
------------------

-- No monitor model is fixed here; Hyprland detects the connected outputs.
-- Add per-monitor profiles only after checking hyprctl monitors all.


---------------------
---- MY PROGRAMS ----
---------------------

local terminal = "kitty"
local launcher = "fuzzel"
local browser = "firefox"
local file_manager = "thunar"


-------------------
---- AUTOSTART ----
-------------------

local ENABLE_AUTOSTART = true
local ENABLE_WAYBAR_AUTOSTART = true
local ENABLE_WALLPAPER_AUTOSTART = true
local ENABLE_BROWSER_AUTOSTART = true

if ENABLE_WAYBAR_AUTOSTART then
  hl.on("hyprland.start", function()
    hl.exec_cmd('waybar --config "$HOME/.config/waybar/config" --style "$HOME/.config/waybar/style.css"')
  end)
end

-- NetworkManager, Bluetooth and audio daemons are system services; only their
-- user applets/agents run in this session.
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
    hl.exec_cmd("udiskie --tray")
    hl.exec_cmd("systemctl --user start hyprpolkitagent.service")
    hl.exec_cmd("wl-paste --type text --watch cliphist store")
    hl.exec_cmd("wl-paste --type image --watch cliphist store")
    hl.exec_cmd('gsettings set org.gnome.desktop.interface gtk-theme "Adwaita-dark"')
    hl.exec_cmd('gsettings set org.gnome.desktop.interface icon-theme "Papirus-Dark"')
    hl.exec_cmd('gsettings set org.gnome.desktop.interface cursor-theme "Adwaita"')
    hl.exec_cmd('gsettings set org.gnome.desktop.interface font-name "Noto Sans 11"')
  end)
end

if ENABLE_BROWSER_AUTOSTART then
  hl.on("hyprland.start", function() hl.exec_cmd(browser) end)
end


-------------------------------
---- ENVIRONMENT VARIABLES ----
-------------------------------

-- Environment for Wayland applications and XDG portal selection.
hl.env("XDG_CURRENT_DESKTOP", "Hyprland")
hl.env("XDG_SESSION_DESKTOP", "Hyprland")
hl.env("XDG_SESSION_TYPE", "wayland")
hl.env("QT_QPA_PLATFORM", "wayland;xcb")
hl.env("MOZ_ENABLE_WAYLAND", "1")
hl.env("XCURSOR_SIZE", "24")
hl.env("HYPRCURSOR_SIZE", "24")


-----------------------
----- PERMISSIONS -----
-----------------------

-- No custom Hyprland permissions are needed for the current setup.


-----------------------
---- LOOK AND FEEL ----
-----------------------

hl.config({
  general = {
    gaps_in = 4,
    gaps_out = 2,
    border_size = 2,
    layout = "dwindle",
    resize_on_border = true,
    allow_tearing = false,
    col = {
      active_border = { colors = { "rgba(f5c2e7ff)" }, angle = 0 },
      inactive_border = { colors = { "rgba(45475aff)" }, angle = 0 },
    },
  },
  decoration = {
    rounding = 0,
    rounding_power = 2,
    active_opacity = 1.0,
    inactive_opacity = 1.0,
    shadow = {
      enabled = true,
      range = 4,
      render_power = 3,
      color = 0xee1a1a1a,
    },
    blur = {
      enabled = true,
      size = 3,
      passes = 1,
      vibrancy = 0.1696,
    },
  },
  animations = { enabled = true },
  dwindle = {
    preserve_split = true,
    smart_split = true,
  },
})

hl.config({ master = { new_status = "master" } })
hl.config({ scrolling = { fullscreen_on_one_column = true } })

hl.curve("easeOutQuint", { type = "bezier", points = { { 0.23, 1 }, { 0.32, 1 } } })
hl.curve("easeInOutCubic", { type = "bezier", points = { { 0.65, 0.05 }, { 0.36, 1 } } })
hl.curve("linear", { type = "bezier", points = { { 0, 0 }, { 1, 1 } } })
hl.curve("almostLinear", { type = "bezier", points = { { 0.5, 0.5 }, { 0.75, 1 } } })
hl.curve("quick", { type = "bezier", points = { { 0.15, 0 }, { 0.1, 1 } } })
hl.curve("easy", { type = "spring", mass = 1, stiffness = 238.1191, damping = 24.21279333 })

for _, animation in ipairs({
  { leaf = "global", enabled = true, speed = 10, bezier = "default" },
  { leaf = "border", enabled = true, speed = 5.39, bezier = "easeOutQuint" },
  { leaf = "windows", enabled = true, speed = 4.79, spring = "easy" },
  { leaf = "windowsIn", enabled = true, speed = 4.1, spring = "easy", style = "popin 87%" },
  { leaf = "windowsOut", enabled = true, speed = 1.49, bezier = "linear", style = "popin 87%" },
  { leaf = "fadeIn", enabled = true, speed = 1.73, bezier = "almostLinear" },
  { leaf = "fadeOut", enabled = true, speed = 1.46, bezier = "almostLinear" },
  { leaf = "fade", enabled = true, speed = 3.03, bezier = "quick" },
  { leaf = "layers", enabled = true, speed = 3.81, bezier = "easeOutQuint" },
  { leaf = "layersIn", enabled = true, speed = 4, bezier = "easeOutQuint", style = "fade" },
  { leaf = "layersOut", enabled = true, speed = 1.5, bezier = "linear", style = "fade" },
  { leaf = "fadeLayersIn", enabled = true, speed = 1.79, bezier = "almostLinear" },
  { leaf = "fadeLayersOut", enabled = true, speed = 1.39, bezier = "almostLinear" },
  { leaf = "workspaces", enabled = true, speed = 1.94, bezier = "almostLinear", style = "fade" },
  { leaf = "workspacesIn", enabled = true, speed = 1.21, bezier = "almostLinear", style = "fade" },
  { leaf = "workspacesOut", enabled = true, speed = 1.94, bezier = "almostLinear", style = "fade" },
  { leaf = "zoomFactor", enabled = true, speed = 7, bezier = "quick" },
}) do
  hl.animation(animation)
end

----------------
---- MISC ----
----------------

hl.config({
  misc = {
    force_default_wallpaper = -1,
    disable_hyprland_logo = true,
    disable_splash_rendering = true,
  },
})


----------------
---- LAYERS ----
----------------

hl.config({ layers = { allow_new_top_layers_over_existing_fullscreen = true } })


---------------
---- INPUT ----
---------------

hl.config({
  input = {
    kb_layout = "es",
    kb_variant = "",
    kb_model = "",
    kb_options = "grp:alt_shift_toggle,caps:escape",
    kb_rules = "",
    repeat_delay = 250,
    repeat_rate = 30,
    follow_mouse = 1,
    sensitivity = 0,
    touchpad = {
      tap_to_click = true,
      natural_scroll = true,
      disable_while_typing = true,
      clickfinger_behavior = true,
      tap_button_map = "lrm",
      tap_and_drag = true,
      drag_lock = 1,
      middle_button_emulation = true,
      scroll_factor = 0.5,
    },
  },
})

hl.gesture({ fingers = 3, direction = "horizontal", action = "workspace" })


---------------------
---- KEYBINDINGS ----
---------------------

local function bind(keys, dispatcher, description, options)
  options = options or {}
  options.description = description
  hl.bind(keys, dispatcher, options)
end

-- Applications
bind("SUPER + Return", hl.dsp.exec_cmd(terminal), "Terminal")
bind("SUPER + Q", hl.dsp.exec_cmd(terminal), "Terminal (official sample binding)")
bind("SUPER + SHIFT + Return", hl.dsp.exec_cmd(terminal .. " --class floating", { float = true, center = true }), "Floating terminal")
bind("SUPER + D", hl.dsp.exec_cmd(launcher), "Application launcher")
bind("SUPER + SHIFT + D", hl.dsp.exec_cmd(launcher .. " --show-actions"), "Application launcher with desktop actions")
bind("SUPER + SHIFT + B", hl.dsp.exec_cmd(browser), "Browser")
bind("SUPER + SHIFT + F", hl.dsp.exec_cmd(file_manager), "File manager")
bind("SUPER + SHIFT + Q", hl.dsp.window.close(), "Close focused window")
bind("SUPER + SHIFT + C", hl.dsp.reload_config(), "Reload Hyprland configuration")
local window_info_command = [[notify-send "Window Info" "$(hyprctl activewindow -j | jq -r '"class: \(.class // "N/A")\ninitial class: \(.initialClass // "N/A")\ntitle: \(.title // "N/A")"')"]]
bind("SUPER + SHIFT + I", hl.dsp.exec_cmd(window_info_command), "Show focused window details")
bind("SUPER + N", hl.dsp.exec_cmd("makoctl restore"), "Restore last notification")
bind("SUPER + SHIFT + N", hl.dsp.exec_cmd("makoctl mode -t do-not-disturb"), "Toggle do not disturb")

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
bind("SUPER + P", hl.dsp.window.pseudo(), "Toggle pseudo-tiled mode")
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

-- Resize mode with coarse and fine control.
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

-- Layouts: groups approximate tabbed containers; Dwindle preselects the next split.
bind("SUPER + W", hl.dsp.group.toggle(), "Toggle a window group")
bind("SUPER + ALT + TAB", hl.dsp.group.next(), "Focus next window in group")
bind("SUPER + ALT + SHIFT + TAB", hl.dsp.group.prev(), "Focus previous window in group")
for key, direction in pairs({ H = "l", J = "d", K = "u", L = "r", left = "l", down = "d", up = "u", right = "r" }) do
  bind("SUPER + CTRL + " .. key, hl.dsp.window.move({ into_or_create_group = direction }), "Move window into or create group " .. direction)
end
bind("SUPER + CTRL + SHIFT + W", hl.dsp.window.move({ out_of_group = true }), "Move window out of its group")

local function preselect_split(direction)
  local workspace = hl.get_active_workspace()
  if workspace and workspace.tiled_layout == "dwindle" then
    hl.dispatch(hl.dsp.layout("preselect " .. direction))
  end
end
bind("SUPER + B", function() preselect_split("r") end, "Preselect a horizontal split")
bind("SUPER + V", function() preselect_split("d") end, "Preselect a vertical split")

local active_layout = "dwindle"
bind("SUPER + E", function()
  active_layout = active_layout == "dwindle" and "master" or "dwindle"
  hl.config({ general = { layout = active_layout } })
end, "Toggle Dwindle/Master layout")

-- Audio, media, and brightness keys.
bind("XF86AudioRaiseVolume", hl.dsp.exec_cmd("wpctl set-volume -l 1.5 @DEFAULT_AUDIO_SINK@ 5%+"), "Volume up", { locked = true, repeating = true })
bind("XF86AudioLowerVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-"), "Volume down", { locked = true, repeating = true })
bind("SHIFT + XF86AudioRaiseVolume", hl.dsp.exec_cmd("wpctl set-volume -l 1.5 @DEFAULT_AUDIO_SINK@ 1%+"), "Volume up slightly")
bind("SHIFT + XF86AudioLowerVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 1%-"), "Volume down slightly")
bind("XF86AudioMute", hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"), "Mute audio", { locked = true, repeating = true })
bind("XF86AudioMicMute", hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SOURCE@ toggle"), "Mute microphone", { locked = true, repeating = true })
bind("XF86MonBrightnessUp", hl.dsp.exec_cmd("brightnessctl -e4 -n2 set 5%+"), "Brightness up", { locked = true, repeating = true })
bind("XF86MonBrightnessDown", hl.dsp.exec_cmd("brightnessctl -e4 -n2 set 5%-"), "Brightness down", { locked = true, repeating = true })
bind("SHIFT + XF86MonBrightnessUp", hl.dsp.exec_cmd("brightnessctl set 1%+"), "Brightness up slightly")
bind("SHIFT + XF86MonBrightnessDown", hl.dsp.exec_cmd("brightnessctl set 1%-"), "Brightness down slightly")
bind("XF86AudioPlay", hl.dsp.exec_cmd("playerctl play-pause"), "Play/pause", { locked = true })
bind("XF86AudioPause", hl.dsp.exec_cmd("playerctl play-pause"), "Play/pause", { locked = true })
bind("XF86AudioNext", hl.dsp.exec_cmd("playerctl next"), "Next track", { locked = true })
bind("XF86AudioPrev", hl.dsp.exec_cmd("playerctl previous"), "Previous track", { locked = true })
bind("XF86AudioStop", hl.dsp.exec_cmd("playerctl stop"), "Stop playback", { locked = true })

bind("SUPER + mouse_down", hl.dsp.focus({ workspace = "e+1" }), "Next workspace with Super + wheel")
bind("SUPER + mouse_up", hl.dsp.focus({ workspace = "e-1" }), "Previous workspace with Super + wheel")
hl.bind("SUPER + mouse:272", hl.dsp.window.drag(), { mouse = true, description = "Drag window with Super + left mouse" })
hl.bind("SUPER + mouse:273", hl.dsp.window.resize(), { mouse = true, description = "Resize window with Super + right mouse" })
bind("SUPER + S", hl.dsp.workspace.toggle_special("magic"), "Toggle official sample scratchpad")
-- Screenshot and desktop helper bindings.
local screenshot_dir = "$HOME/Pictures/Screenshots"
local screenshot_timestamp = "$(date +%Y-%m-%d-%H%M%S-%N)"
local function screenshot_command(arguments)
  local file = screenshot_dir .. "/" .. screenshot_timestamp .. ".png"
  return 'file="' .. file .. '"; mkdir -p "' .. screenshot_dir .. '" && grim ' .. arguments .. ' "$file" && notify-send "Captura desada" "${file##*/}"'
end

bind("Print", hl.dsp.exec_cmd(screenshot_command("")), "Save full-screen screenshot")
bind("SUPER + PRINT", hl.dsp.exec_cmd("$HOME/.local/bin/pm-screenshot-menu"), "Open screenshot menu")
bind("SUPER + SHIFT + S", hl.dsp.exec_cmd([[bash -o pipefail -c 'grim -g "$(slurp)" - | wl-copy && notify-send "Àrea copiada al porta-retalls"']]), "Copy selected area")
bind("SUPER + SHIFT + V", hl.dsp.exec_cmd('selection=$(cliphist list | fuzzel --dmenu) && [ -n "$selection" ] && printf "%s\\n" "$selection" | cliphist decode | wl-copy'), "Clipboard history")
bind("SUPER + ALT + W", hl.dsp.exec_cmd("$HOME/.local/bin/pm-wallpaper next"), "Next wallpaper")
bind("SUPER + ALT + SHIFT + W", hl.dsp.exec_cmd("$HOME/.local/bin/pm-wallpaper select"), "Select wallpaper")

-- Power menu: reboot and shutdown ask for confirmation; no logout action.
bind("SUPER + SHIFT + E", hl.dsp.exec_cmd("$HOME/.local/bin/pm-power-menu"), "Open power menu")


--------------------------------
---- WINDOWS AND WORKSPACES ----
--------------------------------

-- Preserve Sway workspace intent with Hyprland window rules.
local workspace_rules = {
  { class = "^(Code|code-url-handler|jetbrains-.*|Cursor)$", workspace = "2" },
  { class = "^(firefox|Google-chrome|Chromium|brave-browser|Opera|zen)$", workspace = "3" },
  { class = "^(obsidian|libreoffice.*)$", workspace = "4" },
  { class = "^(Slack|discord|TelegramDesktop)$", workspace = "5" },
  { class = "^(mpv|Spotify|org.gnome.Rhythmbox3)$", workspace = "6" },
}

for _, rule in ipairs(workspace_rules) do
  hl.window_rule({ match = { class = rule.class }, workspace = rule.workspace })
end

hl.window_rule({ match = { modal = true }, float = true, center = true })
hl.window_rule({ match = { class = "^(gnome-calculator|gnome-system-monitor|pavucontrol|nm-connection-editor|blueman-manager)$" }, float = true, center = true })
hl.window_rule({ match = { title = "^(Open|Save) (File|Folder|As)( .*)?$" }, float = true, center = true, size = { 1030, 710 } })
hl.window_rule({ match = { class = "^(pinentry|floating)$" }, float = true, center = true })
hl.window_rule({ match = { class = "^firefox$", title = ".*Picture-in-Picture.*" }, float = true, pin = true })
hl.window_rule({ match = { class = "^mpv$" }, float = true, pin = true, size = { 640, 360 }, center = true })
hl.window_rule({ match = { class = "^steam$", title = "^(Friends List|Steam - News|.* - Chat)$" }, float = true })
hl.window_rule({ match = { class = "^zoom$", title = "^(zoom|Choose ONE of the audio conference options)$" }, float = true, center = true })
hl.window_rule({ name = "suppress-maximize-events", match = { class = ".*" }, suppress_event = "maximize" })
hl.window_rule({
  name = "fix-xwayland-drags",
  match = { class = "^$", title = "^$", xwayland = true, float = true, fullscreen = false, pin = false },
  no_focus = true,
})
hl.window_rule({ name = "move-hyprland-run", match = { class = "hyprland-run" }, move = "20 monitor_h-120", float = true })

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

for key, direction in pairs({
  H = "left", J = "down", K = "up", L = "right",
  left = "left", down = "down", up = "up", right = "right",
}) do
  bind("SUPER + CTRL + SHIFT + " .. key, hl.dsp.workspace.move({ monitor = direction }), "Move workspace to output " .. direction)
end
bind("SUPER + SHIFT + F7", hl.dsp.workspace.move({ monitor = "left" }), "Move workspace to left output")
bind("SUPER + SHIFT + F8", hl.dsp.workspace.move({ monitor = "right" }), "Move workspace to right output")



-----------------------------
---- PER ORDENAR DESPRÉS ----
-----------------------------

-- Helpers are next to their consumers above. Put future items here only if
-- they do not fit one of the official example sections.

-- Official sample alternatives that need a machine-specific choice:
-- Monitor template (replace output with the real output name before enabling):
-- hl.monitor({ output = "", mode = "preferred", position = "auto", scale = "auto" })

-- Per-device sample is for a device name that may not exist on this computer:
-- hl.device({ name = "epic-mouse-v1", sensitivity = -0.5 })

-- Optional permission examples from the official sample. Enabling permissions
-- requires a Hyprland restart and should be matched to installed paths:
-- hl.config({ ecosystem = { enforce_permissions = true } })
-- hl.permission("/usr/(bin|local/bin)/grim", "screencopy", "allow")
-- hl.permission("/usr/(lib|libexec|lib64)/xdg-desktop-portal-hyprland", "screencopy", "allow")
-- hl.permission("/usr/(bin|local/bin)/hyprpm", "plugin", "allow")

-- Optional smart-gap sample rules:
-- hl.workspace_rule({ workspace = "w[tv1]", gaps_out = 0, gaps_in = 0 })
-- hl.workspace_rule({ workspace = "f[1]", gaps_out = 0, gaps_in = 0 })
-- hl.window_rule({ name = "no-gaps-wtv1", match = { float = false, workspace = "w[tv1]" }, border_size = 0, rounding = 0 })
-- hl.window_rule({ name = "no-gaps-f1", match = { float = false, workspace = "f[1]" }, border_size = 0, rounding = 0 })
-- Example layer rule:
-- hl.layer_rule({ name = "no-anim-overlay", match = { namespace = "^my-overlay$" }, no_anim = true })

-- Bindings from the official sample that collide with your current shortcuts:
-- SUPER + L -> hyprlock (currently focus right; you explicitly wanted that preserved)
-- SUPER + E -> Thunar (currently toggles Dwindle/Master)
-- SUPER + M -> exit/power action (currently returns to previous workspace)
-- SUPER + V -> toggle floating (currently preselects vertical split)
-- SUPER + R -> launcher (currently enters the resize submap)
-- SUPER + J -> toggle split (currently focuses down)
-- SUPER + SHIFT + S -> move focused window to special:magic (currently area screenshot)
-- SUPER + E -> file manager (duplicate in the official sample as well)

-- The sample's autogenerated warning line is intentionally omitted:
-- hl.config({ autogenerated = true })
