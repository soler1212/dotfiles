-- plugins/telescope.lua:
return {
  {
    'nvim-telescope/telescope.nvim',
    -- branch = 'master', -- Fem servir master en lloc de tag fix per a la 0.12
    dependencies = { 'nvim-lua/plenary.nvim' },
    init = function()
      -- [[ Neovim 0.12 Compatibility per a Telescope ]]
      -- Telescope encara fa servir vim.treesitter.ft_to_lang que ja no existeix a la 0.12
      if vim.treesitter and not vim.treesitter.ft_to_lang then
        vim.treesitter.ft_to_lang = function(ft)
          local ok, lang = pcall(function() return vim.treesitter.language.get_lang(ft) end)
          return ok and lang or ft
        end
      end
    end,
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
