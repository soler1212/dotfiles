-- Improve neovim lsp experience.
-- https://github.com/nvimdev/lspsaga.nvim
return {
  'nvimdev/lspsaga.nvim',
  commit = '562d9724e3869ffd1801c572dd149cc9f8d0cc36', -- Congelat al commit funcional
  dependencies = {
    'nvim-treesitter/nvim-treesitter',
    'nvim-tree/nvim-web-devicons',
  },
  config = function()
    require("cargolreactiu.after.plugins.lspsaga")
  end
}
