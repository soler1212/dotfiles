# Sway Configuration Improvements

## Overview

This improved Sway configuration provides a modern, feature-rich desktop environment with better organization, automation, and user experience.

## Key Improvements

### 1. **Modular Configuration**
- Split configuration into logical modules in `config.d/`
- Numbered files for proper loading order
- Easy to maintain and customize

### 2. **Display Management**
- Automatic display detection and configuration
- Multiple display profiles (laptop, home, office)
- Clamshell mode support
- Display switching keybindings

### 3. **Enhanced Window Management**
- Scratchpad terminal (`$mod+grave`)
- Better floating window rules
- Improved resize mode with fine control
- Window information helper (`$mod+Shift+i`)

### 4. **Power Management**
- Proper idle and lock configuration with swayidle
- Suspend after 15 minutes of inactivity
- Multiple power modes
- Hibernate support

### 5. **Better Theming**
- Catppuccin color scheme
- Consistent GTK theme settings
- Improved waybar with more features
- Icon support throughout

### 6. **Wallpaper Management**
- Advanced wallpaper rotation script
- Sequential, random, and time-based modes
- Wallpaper daemon for automatic changes
- Notification on wallpaper change

### 7. **Input Improvements**
- Better keyboard layout switching (ES/US)
- Improved touchpad configuration
- Media key support
- Fine-grained volume control

### 8. **Modern Waybar**
- CPU, memory, and temperature monitoring
- Bluetooth indicator
- Idle inhibitor toggle
- Weather widget
- Improved workspace icons

## Installation

1. **Backup your current configuration:**
   ```bash
   cp -r ~/.config/sway ~/.config/sway.backup
   cp -r ~/.config/waybar ~/.config/waybar.backup
   ```

2. **Install dependencies:**
   ```bash
   # Arch Linux
   sudo pacman -S sway swaylock swayidle waybar mako grim slurp wl-clipboard \
                  brightnessctl playerctl pavucontrol blueman network-manager-applet \
                  polkit-gnome jq libnotify ttf-jetbrains-mono papirus-icon-theme

   # Optional
   sudo pacman -S clipman wofi
   ```

3. **Copy the new configuration files**

4. **Make scripts executable:**
   ```bash
   chmod +x ~/.config/sway/scripts/*.sh
   ```

5. **Create required directories:**
   ```bash
   mkdir -p ~/.config/sway/wallpapers
   mkdir -p ~/Pictures/Screenshots
   ```

## Usage

### Key Bindings

#### Window Management
- `$mod+Return` - Open terminal
- `$mod+d` - Application launcher
- `$mod+Shift+q` - Close window
- `$mod+f` - Fullscreen
- `$mod+Space` - Toggle floating
- `$mod+r` - Resize mode
- `$mod+grave` - Scratchpad terminal

#### Workspaces
- `$mod+[1-0]` - Switch workspace
- `$mod+Shift+[1-0]` - Move to workspace
- `$mod+Tab` - Next workspace
- `$mod+Shift+Tab` - Previous workspace

#### Display Management
- `$mod+p` - Display profiles menu
- `$mod+F7` - Toggle laptop display
- `$mod+Shift+F7/F8` - Move workspace between outputs

#### System
- `$mod+l` - Lock screen
- `$mod+Shift+e` - Power menu
- `$mod+Shift+c` - Reload config
- `$mod+Print` - Screenshot mode

#### Media
- `XF86Audio*` - Volume/media controls
- `$mod+F10/F11/F12` - Play/Previous/Next

### Scripts

#### Wallpaper Manager
```bash
# Next wallpaper
~/.config/sway/scripts/wallpaper-manager.sh next

# Random wallpaper
~/.config/sway/scripts/wallpaper-manager.sh random

# Time-based wallpaper
~/.config/sway/scripts/wallpaper-manager.sh time

# Run as daemon (changes every 30 min)
~/.config/sway/scripts/wallpaper-manager.sh daemon
```

#### Display Setup
```bash
# Apply display configuration once
~/.config/sway/scripts/display-setup.sh apply

# Monitor for display changes
~/.config/sway/scripts/display-setup.sh monitor
```

## Customization

### Colors
Edit the color variables in the main config to change the theme.

### Workspaces
Modify workspace assignments in `02-workspaces.conf`.

### Window Rules
Add custom window rules in `01-windows.conf`.

### Idle Behavior
Adjust timeouts in `05-idle-lock.conf`.

## Troubleshooting

1. **GTK apps slow to start:**
   Ensure `dbus-update-activation-environment` is running.

2. **Waybar not showing:**
   Check `waybar` logs: `journalctl --user -u waybar`

3. **Display issues:**
   Run `swaymsg -t get_outputs` to check display names.

4. **Lock screen not working:**
   Ensure `swaylock` is installed and the lockscreen image exists.

## Tips

- Use `$mod+Shift+i` to get window information for creating rules
- The scratchpad terminal is great for quick commands
- Waybar modules are clickable - try left and right clicks
- Use `$mod+Shift+d` to toggle debug information
