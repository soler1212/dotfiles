-- plugins/telescope.lua:
return {
  {
    'nvim-telescope/telescope.nvim',
    tag = '0.1.8', -- La versió estable 0.1.8 no té el bug del layout de possession.nvim
    dependencies = { 'nvim-lua/plenary.nvim' },
    config = function()
      require("cargolreactiu.after.plugins.telescope")
    end,
  },

  -- It sets vim.ui.select to telescope. That means for example that neovim core stuff can fill the telescope picker.
  -- https://github.com/nvim-telescope/telescope-ui-select.nvim
  {
    "nvim-telescope/telescope-ui-select.nvim"
  }
}
