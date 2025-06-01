# Dotfiles

Sway-based Wayland desktop environment with Neovim development setup.

## Quick Install

```bash
# Clone dotfiles
git clone <your-repo> ~/.dotfiles
cd ~/.dotfiles

# Install all dependencies
sudo apt install sway swaylock swayidle waybar mako-notifier grim slurp \
  wl-clipboard brightnessctl playerctl pamixer blueman network-manager-gnome \
  polkit-gnome wezterm neovim ripgrep fd-find nodejs npm fonts-jetbrains-mono \
  papirus-icon-theme ulauncher wofi pavucontrol jq

# Symlink configs
ln -sf ~/.dotfiles/sway ~/.config/
ln -sf ~/.dotfiles/waybar ~/.config/
ln -sf ~/.dotfiles/nvim ~/.config/
ln -sf ~/.dotfiles/wezterm ~/.config/

# Make scripts executable
chmod +x ~/.config/sway/scripts/*.sh
```

## Stack Overview

### Window Manager
- **Sway** - i3-compatible Wayland compositor
- **Waybar** - Status bar
- **Mako** - Notifications
- **Ulauncher** - Application launcher

### Terminal & Editor
- **WezTerm** - GPU-accelerated terminal
- **Neovim** - Modal editor with LSP support

### Theme
- **Catppuccin Mocha** - Consistent dark theme
- **JetBrains Mono** - Programming font
- **Papirus Dark** - Icon theme

## Key Bindings Philosophy
- **Super** - Window management
- **Super + Shift** - System actions
- **Super + Ctrl** - Move and follow
- **Space** - Leader key in Neovim

## Directory Structure
```
~/.config/
├── sway/          # Window manager
├── waybar/        # Status bar
├── nvim/          # Editor
├── wezterm/       # Terminal
└── mako/          # Notifications (auto-generated)
```

## Session Workflow
1. Login to Sway
2. Display auto-detection starts
3. Waybar loads with system info
4. Open terminal with `Super + Enter`
5. Neovim session management via dashboard

## Development Workflow
1. `Super + 2` - Development workspace
2. `nvim` - Opens dashboard
3. `<leader>sl` - Load project session
4. `<leader>ff` - Find files
5. `LSP` auto-configures per language

## Quick Reference
- **Lock**: `Super + l`
- **Power menu**: `Super + Shift + e`
- **Screenshot**: `Super + Shift + s`
- **Terminal**: `Super + Enter`
- **Editor**: `nvim` in terminal

## Troubleshooting
```bash
# Check Sway logs
journalctl --user -u sway

# Test Waybar modules
waybar -l debug

# Neovim health
nvim +checkhealth
```
