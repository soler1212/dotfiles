# Dotfiles

Personal configuration files managed with [chezmoi](https://www.chezmoi.io/).

This repository contains my personal setup for a productive development environment on Linux, featuring a Sway-based Wayland desktop, Neovim, and highly customized terminal tools.

## Core Components

- **Window Manager**: [Sway](https://swaywm.org/) (i3-compatible Wayland compositor)
- **Widgets & Bar**: [AGS (Aylur's GTK Shell)](https://github.com/Aylur/ags)
- **Editor**: [Neovim](https://neovim.io/) (Lua-based configuration)
- **Terminal**: [WezTerm](https://wezfurlong.org/wezterm/)
- **Shell**: Bash with [Oh My Posh](https://ohmyposh.dev/) prompts
- **Tools**: fzf, bat, nvim, ripgrep, and more.

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

## Structure

- `dot_bashrc`: Bash configuration.
- `dot_poshthemes/`: Oh My Posh theme definitions.
- `private_dot_config/`:
    - `ags/`: Desktop widgets and UI components.
    - `nvim/`: Neovim IDE-like setup.
    - `sway/`: Window manager keybindings and rules.
    - `wezterm/`: Terminal emulator configuration.

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
