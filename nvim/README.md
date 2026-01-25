# Neovim Configuration

## Dependencies
```bash
neovim ripgrep fd-find nodejs npm
# LSP servers installed via Mason
```

## Plugin Manager
- **Lazy.nvim** - Auto-installs on first run

## Key Plugins
- **Alpha** - Dashboard
- **Telescope** - Fuzzy finder
- **LSP** - Language servers (Mason)
- **Treesitter** - Syntax highlighting
- **Trouble** - Diagnostics
- **Gitsigns** - Git integration
- **Barbar** - Tab management
- **Neo-tree** - File explorer
- **Possession** - Session management

## Key Bindings

### Leader = Space

### Files
- `<leader>ff` - Find files
- `<leader>fw` - Live grep
- `<leader>fb` - Buffers
- `<leader>e` - Neo-tree toggle

### LSP
- `K` - Hover
- `gd` - Definition
- `gr` - References
- `<F2>` - Rename
- `<F3>` - Format
- `<F4>` - Code action

### Git
- `<leader>gs` - Stage hunk
- `<leader>gr` - Reset hunk
- `<leader>gb` - Blame line
- `]h` / `[h` - Next/prev hunk

### Buffers/Tabs
- `<Tab>` - Next buffer
- `<S-Tab>` - Previous buffer
- `<leader>C` - Close buffer

### Sessions
- `<leader>sw` - Save session
- `<leader>sl` - List sessions
- `<leader>ss` - Load last session

### Marks
- `<leader>mm` - Toggle mark
- `<leader>mla` - List all marks

### Windows
- `<C-h/j/k/l>` - Navigate windows

## LSP Servers
Auto-installed via Mason:
- `lua_ls` - Lua
- `ts_ls` - TypeScript
- `eslint` - JavaScript/TypeScript
- `pyright` - Python

## File Structure
```
~/.config/nvim/
├── init.lua
└── lua/cargolreactiu/
    ├── init.lua
    ├── mappings.lua
    ├── options.lua
    ├── init_lazy.lua
    ├── plugins/         # Plugin specs
    ├── colorschemes/    # Color schemes
    └── after/           # Plugin configs
        ├── plugins/     # Plugin setups
        └── ui/          # UI configs
```

## Options
- Relative line numbers
- Tab = 2 spaces
- Centered cursor (scrolloff=1000)
- No swap files
- Persistent undo
