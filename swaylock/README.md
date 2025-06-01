# Swaylock Configuration

## Dependencies
```bash
swaylock swaylock-effects
```

## Configuration
- **Background**: `~/.config/sway/images/lockscreen_background.png`
- **Font**: JetBrains Mono 24px
- **Theme**: Catppuccin colors
- **Indicator**: 100px radius ring

## Colors
- **Ring**: Lavender (normal), Yellow (clear), Blue (verifying), Red (wrong)
- **Text**: Light grey
- **Inside**: Transparent dark

## Features
- Shows failed attempts
- Ignores empty password
- Indicator visible when idle
- Colored feedback for actions

## Files
```
~/.config/swaylock/
└── config
```

## Usage
```bash
# Manual lock
swaylock

# With custom image
swaylock -i /path/to/image.png

# From Sway
Super + l
```

## Integration
Called by:
- Sway keybinding (`Super + l`)
- Swayidle timeout
- System suspend/sleep
- Power menu
