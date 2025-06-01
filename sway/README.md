# Sway Setup

## Install (Ubuntu)

```bash
# Core
sudo apt install sway swaylock swayidle waybar mako-notifier grim slurp wl-clipboard \
                 brightnessctl playerctl pavucontrol blueman network-manager-gnome \
                 policykit-1-gnome jq libnotify-bin fonts-jetbrains-mono papirus-icon-theme

# Optional
sudo apt install clipman wofi ulauncher
```

## Setup

```bash
# Backup
cp -r ~/.config/sway ~/.config/sway.backup 2>/dev/null || true
cp -r ~/.config/waybar ~/.config/waybar.backup 2>/dev/null || true

# Copy configs
# (copy your sway and waybar directories)

# Make scripts executable
chmod +x ~/.config/sway/scripts/*.sh

# Create directories
mkdir -p ~/.config/sway/wallpapers ~/Pictures/Screenshots
```

## Key Bindings

| Key | Action |
|-----|--------|
| `Super + Enter` | Terminal |
| `Super + `` ` | Scratchpad terminal |
| `Super + d` | App launcher |
| `Super + Shift + q` | Close window |
| `Super + f` | Fullscreen |
| `Super + l` | Lock screen |
| `Super + Print` | Screenshot menu |
| `Super + 1-0` | Switch workspace |
| `Super + Shift + 1-0` | Move to workspace |

## Usage

```bash
# Wallpaper rotation
~/.config/sway/scripts/wallpaper-manager.sh next

# Display auto-detection (run once)
~/.config/sway/scripts/display-setup.sh monitor &
```

## Done

Log out, select Sway, log in.
