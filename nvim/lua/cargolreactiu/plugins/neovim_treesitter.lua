-- Nvim Treesitter configurations and abstraction layer
-- https://github.com/nvim-treesitter/nvim-treesitter
return {
  "nvim-treesitter/nvim-treesitter",
  branch = "main",
  build = ":TSUpdate",
  event = "VimEnter",
  dependencies = {
    "nvim-lua/plenary.nvim",
  },
  config = function()
    require("cargolreactiu.after.plugins.treesitter")
  end,
}

