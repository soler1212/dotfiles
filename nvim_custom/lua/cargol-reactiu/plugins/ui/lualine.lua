return {
  'nvim-lualine/lualine.nvim',
  dependencies = { 'nvim-tree/nvim-web-devicons' },
  init = function()
    local lualine_config = require 'cargol-reactiu.plugins.ui.lualine_themes.bubble'
    -- local lualine_config = require 'cargol-reactiu.plugins.ui.lualine_themes.default'
    -- local lualine_config = require 'cargol-reactiu.plugins.ui.lualine_themes.evil_lualine'
    --local lualine_config = require 'cargol-reactiu.plugins.ui.lualine_themes.slanted-gaps'
    require('lualine').setup(lualine_config)
  end,
}
