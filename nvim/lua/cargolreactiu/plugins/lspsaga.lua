-- improve neovim lsp experience
-- https://github.com/nvimdev/lspsaga.nvim
return {
  'nvimdev/lspsaga.nvim',
  dependencies = {
    'nvim-treesitter/nvim-treesitter',     -- optional
    'nvim-tree/nvim-web-devicons',         -- optional
  },
  config = function()
    require("cargolreactiu.after.plugins.lspsaga")
  end
}
