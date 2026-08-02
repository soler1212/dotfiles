# Nvim Test Environment

This directory contains various file types to test Neovim's behavior:

## Structure

- `src/` - Source code files
- `scripts/` - Shell and Python scripts
- `docs/` - Documentation
- `configs/` - Configuration files
- `data/` - Sample data files

## File Types

| File | Language | Purpose |
|------|----------|---------|
| `src/math_utils.py` | Python | Functions and classes |
| `src/web_component.js` | JavaScript | ES6 classes |
| `src/config_parser.rs` | Rust | Parsing logic |
| `src/main.go` | Go | JSON handling |
| `scripts/backup.sh` | Bash | Shell scripting |
| `scripts/monitor.py` | Python | System monitoring |

## Testing Tips

1. Open the directory: `nvim ./nvim-test`
2. Use `:Telescope find_files` to search
3. Try `gd` on function definitions
4. Test syntax highlighting per file type
5. Use `:%!xxd` to view binary files
