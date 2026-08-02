# Dotfiles

Personal configuration files managed with [chezmoi](https://www.chezmoi.io/).

This repository contains my personal setup for a productive development environment on Linux, featuring a Sway-based Wayland desktop, Neovim, and highly customized terminal tools.

## Core Components

- **Window Manager**: [Sway](https://swaywm.org/) (i3-compatible Wayland compositor)
- **Widgets & Bar**: [AGS (Aylur's GTK Shell)](https://github.com/Aylur/ags)
- **Editor**: [Neovim](https://neovim.io/) (Lua-based configuration)
- **Terminal**: [WezTerm](https://wezfurlong.org/wezterm/)
- **Shell**: Bash with [Oh My Posh](https://ohmyposh.dev/) prompts
- **Tools**: fzf, bat, nvim, eza, ripgrep, and more.

## Installation

### 1. Install chezmoi

```bash
sh -c "$(curl -fsLS get.chezmoi.io)"
```

### 2. Initialize and Apply

```bash
# Initialize with this repository
chezmoi init https://github.com/soler1212/dotfiles.git

# Review changes
chezmoi diff

# Apply configurations
chezmoi apply
```

## System Dependencies

### Bat

> https://github.com/sharkdp/bat#installation

```
sudo apt install bat
```

### Zoxide

> https://github.com/ajeetdsouza/zoxide#installation

```
curl -sSfL https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | sh
```

### FZF

> https://github.com/junegunn/fzf

```
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
```

### Eza

> https://github.com/eza-community/eza/blob/main/INSTALL.md

```
sudo apt update
sudo apt install -y gpg

sudo mkdir -p /etc/apt/keyrings
wget -qO- https://raw.githubusercontent.com/eza-community/eza/main/deb.asc | sudo gpg --dearmor -o /etc/apt/keyrings/gierens.gpg
echo "deb [signed-by=/etc/apt/keyrings/gierens.gpg] http://deb.gierens.de stable main" | sudo tee /etc/apt/sources.list.d/gierens.list
sudo chmod 644 /etc/apt/keyrings/gierens.gpg /etc/apt/sources.list.d/gierens.list
sudo apt update
sudo apt install -y eza
```

### Node

> https://nodejs.org/en/download

```
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 24

# Verify the Node.js version:
node -v # Should print "v24.15.0".

# Verify npm version:
npm -v # Should print "11.12.1".
```


## Structure

- `dot_bashrc`: Bash configuration.
- `dot_poshthemes/`: Oh My Posh theme definitions.
- `private_dot_config/`:
    - `ags/`: Desktop widgets and UI components.
    - `nvim/`: Neovim IDE-like setup.
    - `sway/`: Window manager keybindings and rules.
    - `wezterm/`: Terminal emulator configuration.

## AGS Widgets (ags/moon)

Desktop widgets built with [AGS](https://github.com/Aylur/ags) for the Sway Wayland compositor.

### Deployment Flow

```
~/.local/share/chezmoi/private_dot_config/ags/moon/  (source - chezmoi)
                    ↓ chezmoi apply
~/.config/ags/moon/  (deployed - actual config)
```

### Development Commands

```bash
# Apply chezmoi changes to ~/.config/ags
chezmoi apply

# Restart ags to see changes
~/.config/sway/scripts/ags-restart.sh

# View ags logs (if needed)
agctl logs
```

### Architecture

- `app.tsx` - Entry point, creates widgets per monitor
- `widget/` - UI components (Bar, MoonWidget, DateTimeWidget)
- `services/` - Data services (clock, moon, cpu, memory, workspaces)
- `style.scss` - All styling
- `ThemeService.ts` - Theme management and CSS variables

### Key Patterns

- **Widgets**: `WidgetName(monitor)` returns a GTK window
- **State**: `createState<T>(default)` for reactive state
- **Polling**: `createPoll(default, interval, cmd, parser)` for periodic data
- **Window anchors**: `BOTTOM | LEFT | RIGHT | TOP` combinations

## Maintenance

To update your local configuration with the latest changes from the repository:

```bash
chezmoi update
```

To edit a managed file:

```bash
chezmoi edit <file_path>
```

---

**Note: Automated Dependency Installation**

The automated installation of system dependencies (e.g., `fzf`, `bat`, `nvim`) via `run_once_` or `run_onchange_` scripts is currently pending implementation. 

For more information on how to implement this using chezmoi scripts, refer to the [official documentation on scripts](https://www.chezmoi.io/user-guide/use-scripts-to-perform-actions/#understand-how-scripts-work).
