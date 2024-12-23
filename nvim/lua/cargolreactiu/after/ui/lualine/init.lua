local custom_theme = require(... .. ".themes/gruvbox")
-- INFO: Add more themes and comment the unused ones

require('lualine').setup {
  options = { theme  = custom_theme },
}
