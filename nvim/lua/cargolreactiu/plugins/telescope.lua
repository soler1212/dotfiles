-- plugins/telescope.lua:
return { {
  'nvim-telescope/telescope.nvim',
  tag = '0.1.8',
  dependencies = { 'nvim-lua/plenary.nvim' }
},

  -- It sets vim.ui.select to telescope. That means for example that neovim core stuff can fill the telescope picker.
  -- https://github.com/nvim-telescope/telescope-ui-select.nvim
  {
    "nvim-telescope/telescope-ui-select.nvim"
  }
}
