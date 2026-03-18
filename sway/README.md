# Sway Configuration

## Dependencies
```bash
# Core
sway swaylock swayidle swaybg mako waybar grim slurp wl-clipboard jq

# Audio (PipeWire Migration for Ubuntu 22.04)
pipewire pipewire-pulse wireplumber libspa-0.2-bluetooth pavucontrol
# (Wait to disable pulseaudio: systemctl --user --now disable pulseaudio.service pulseaudio.socket)

# Essential tools
brightnessctl playerctl pamixer blueman network-manager-gnome polkit-gnome
wezterm ulauncher wofi
```

## Audio & Recording (OBS)

### PipeWire Migration (Required for Wayland/Sway)
To enable high-quality Bluetooth audio (Marshall Headphones) and OBS screen/audio capture, the system was migrated from PulseAudio to PipeWire.

1. **Installation:**
   ```bash
   sudo apt update && sudo apt install pipewire-pulse wireplumber libspa-0.2-bluetooth pavucontrol -y
   ```

2. **Configuration:**
   ```bash
   # Disable PulseAudio
   systemctl --user --now disable pulseaudio.service pulseaudio.socket
   systemctl --user --now mask pulseaudio.service pulseaudio.socket

   # Enable PipeWire
   systemctl --user --now enable pipewire pipewire-pulse wireplumber
   ```

3. **Validation:**
   Verify the setup with `pactl info`. It should report: `Server Name: PulseAudio (on PipeWire 0.3.x)`.

### OBS Integration & Screen Sharing
OBS requires a working XDG Desktop Portal to capture audio and video on Wayland.
- **Portal Script:** `~/.config/sway/scripts/portal-setup.sh`
- **Execution:** This script is called in `sway/config` on startup. It ensures `xdg-desktop-portal-wlr` is prioritized.
- **OBS Source:** Use **"Screen Capture (PipeWire)"** and **"Audio Output Capture (PipeWire)"** for best results.

### High Quality Audio & Microphone (Bluetooth Limitations)
If using high-end Bluetooth headphones like **Marshall**, you may face quality issues when using the microphone.

1. **A2DP Profile (High Quality):** Use this for output only (listening). It provides the best sound.
2. **HSP/HFP Profile (Low Quality):** This is for bidirectional audio (microphone + output). Bluetooth bandwidth limitations cause a drastic drop in quality (8-16kHz).

**Recommended OBS Setup for Quality:**
- **Output:** Set Marshall to **A2DP** in `pavucontrol`.
- **Input (Mic):** Avoid using the Marshall's built-in Bluetooth mic. Instead, use an **External USB Mic** or the **Laptop Internal Mic**. 
- **Wired Option:** Use a 3.5mm jack cable with the Marshall to get high quality in both input and output simultaneously.

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
├── portal-setup.sh       # Resets XDG Portals for OBS/Screen Sharing
└── wallpaper-manager.sh  # Advanced wallpaper management
```

### Usage
```bash
# Portal Setup (Run automatically in sway config)
./portal-setup.sh

# Wallpaper
./wallpaper-manager.sh next|random|time|daemon
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
