-- INFO: Add more themes and comment the unused ones
-- https://github.com/nvim-lualine/lualine.nvim/blob/master/THEMES.md
-- ^^^ a lot of premade themes.
--
-- local custom_theme = require(... .. ".themes/everforest")
-- local custom_theme = require(... .. ".themes/gruvbox")
-- local custom_theme = require(... .. ".themes/palenight")
-- local custom_theme = require(... .. ".themes/gruvbox_dark")
--FIXME
local custom_theme = require(... .. ".themes/bubble")
--local custom_theme = require(... .. ".themes/default")
--local custom_theme = require(... .. ".themes/evil")
--local custom_theme = require(... .. ".themes/slanted_gaps")


require('lualine').setup(custom_theme)
