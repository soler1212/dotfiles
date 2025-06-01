# Bash Configuration

## Dependencies
```bash
# Core
bash bash-completion

# Oh-my-posh
oh-my-posh

# Development tools
nvm virtualenvwrapper python3 cargo

# Optional
fzf
```

## Features
- **Oh-my-posh** - Custom prompt with Git status
- **NVM** - Node version management
- **Virtualenvwrapper** - Python environment management
- **FZF** - Fuzzy finder integration
- **History** - Arrow key search, 1000 commands

## Key Aliases
- `ls` - Colorized output
- `grep` - Colorized matches
- `alert` - Notification for long commands
- `plan` - Jump to PlanMomentum project

## Environment
```bash
# Paths
~/.local/bin
~/.cargo/bin
~/.nvm

# Python
WORKON_HOME=$HOME/.virtualenvs
PROJECT_HOME=$HOME/Desenvolupament

# API Keys
OPENAI_API_KEY (configured)
```

## Files
```
~/.bashrc
~/.poshthemes/
└── aleix-custom.omp.json   # Prompt theme
```

## Prompt Info
Shows:
- OS icon (WSL aware)
- Current path
- Git branch & status
- Language versions (Dart, Node, Python)
- Battery status
- Time

## Key Bindings
- `↑/↓` - History search
- `Tab` - Show all completions
