# Waybar Configuration

## Dependencies
```bash
waybar
# Optional for modules
pamixer playerctl jq
```

## Modules Layout
- **Left**: Workspaces, Mode, Scratchpad
- **Center**: Window title
- **Right**: Tray, Audio, Network, CPU, Memory, Temperature, Battery, Clock

## Custom Modules

### Scratchpad Toggle
- Click: Show scratchpad
- Right-click: Move to scratchpad

## Interactions
- **Audio**: Click for pavucontrol, right-click to mute
- **CPU/Memory**: Click for htop
- **Network**: Click for nm-connection-editor
- **Clock**: Click for gnome-calendar

## Files
```
~/.config/waybar/
├── config      # Module configuration
└── style.css   # Catppuccin Mocha theme
```

## Troubleshooting
- If waybar disappears, check `journalctl -u waybar`
- Failed modules cause bar to hide
- GTK apps slow? Add to sway config:
  ```
  exec dbus-update-activation-environment --systemd DISPLAY WAYLAND_DISPLAY SWAYSOCK
  ```




## Other

If GTK+ applications take 20 seconds to start, set this configuration in sway.conf
`exec dbus-update-activation-environment --systemd DISPLAY WAYLAND_DISPLAY SWAYSOCK`

More details here: github.com/swaywm/sway/issues/5732

> If some widget fails, the bar will dissapear, fix or disable the widgets that cause the problem


