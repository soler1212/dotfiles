# Sway Configuration

## Dependencies
```bash
# Core
sway swaylock swayidle swaybg mako waybar grim slurp wl-clipboard jq

# Essential tools
brightnessctl playerctl pamixer blueman network-manager-gnome polkit-gnome
wezterm ulauncher wofi pavucontrol

# Fonts & themes
fonts-jetbrains-mono papirus-icon-theme

# Optional
clipman grimshot fcitx5
```

## Key Bindings

### Basic
- `Super + Enter` - Terminal
- `Super + Shift + q` - Kill window
- `Super + d` - Ulauncher
- `Super + Shift + d` - Wofi
- `Super + Shift + c` - Reload config
- `Super + Shift + r` - Restart sway

### Windows
- `Super + h/j/k/l` - Focus window
- `Super + Shift + h/j/k/l` - Move window
- `Super + f` - Fullscreen
- `Super + Shift + space` - Toggle floating
- `Super + r` - Resize mode
- `Super + c` - Center floating window
- `Super + b/v` - Split horizontal/vertical

### Workspaces
- `Super + 1-0` - Switch workspace
- `Super + Shift + 1-0` - Move to workspace
- `Super + Ctrl + 1-0` - Move and follow
- `Super + Tab` - Next workspace
- `Super + m` - Back and forth

### System
- `Super + Shift + e` - Power menu
- `Super + l` - Lock screen
- `Super + Print` - Screenshot menu
- `Super + Shift + s` - Area screenshot to clipboard
- `Super + Shift + v` - Clipboard manager

### Media
- `XF86AudioRaiseVolume` - Volume up
- `XF86AudioLowerVolume` - Volume down
- `XF86AudioMute` - Mute
- `XF86AudioPlay` - Play/pause
- `XF86MonBrightnessUp/Down` - Brightness

### Display
- `Super + F7` - Toggle laptop display
- `Super + p` - Display profiles mode

## Scripts

```bash
~/.config/sway/scripts/
├── display-setup.sh      # Auto display detection
├── iterate-wallpaper.sh  # Simple wallpaper rotation
└── wallpaper-manager.sh  # Advanced wallpaper management
```

### Usage
```bash
# Wallpaper
./wallpaper-manager.sh next|random|time|daemon

# Display auto-config
./display-setup.sh monitor  # Run once on login
```

## File Structure
```
~/.config/sway/
├── config                 # Main config
├── config.d/             # Modular configs
│   ├── 01-windows.conf   # Window management
│   ├── 02-workspaces.conf # Workspace rules
│   ├── 03-outputs.conf   # Display config
│   ├── 04-input.conf     # Keyboard/mouse
│   ├── 05-idle-lock.conf # Power management
│   └── 99-extras.conf    # Extras
├── images/               # Wallpapers
└── scripts/              # Helper scripts
```

## Modes

### Resize Mode (`Super + r`)
- `h/l` - Shrink/grow width
- `j/k` - Grow/shrink height
- `Shift + h/j/k/l` - Fine control (1px)

### Power Mode (`Super + Shift + e`)
- `l` - Lock
- `s` - Suspend
- `r` - Reboot
- `Shift + s` - Shutdown
- `e` - Exit sway

### Display Mode (`Super + p`)
- `l` - Laptop only
- `h` - Home setup
- `o` - Office setup
- `m` - Mirror
- `e` - Extend

## Window Rules

### Floating by default
- Calculator, System Monitor, Pavucontrol
- Network Manager, Blueman
- Pop-ups, dialogs
- Picture-in-Picture

### Workspace assignments
- WS2: Code, IDEs
- WS3: Browsers
- WS4: Obsidian, LibreOffice
- WS5: Slack, Discord, Telegram
- WS6: Media players

## Environment
- Keyboard: ES layout, Caps=Escape
- Touchpad: Natural scroll, tap enabled
- Theme: Catppuccin Mocha
- Font: JetBrains Mono 10
