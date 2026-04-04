-- A bar style tabline for Neovim.
-- https://github.com/romgrk/barbar.nvim
return {
    'romgrk/barbar.nvim',
    version = '^1.0.0', -- Fixem la branca v1 estable
    dependencies = {
      'lewis6991/gitsigns.nvim',
      'nvim-tree/nvim-web-devicons',
    },
    config = function()
        require("cargolreactiu.after.plugins.barbar")
    end,
}
