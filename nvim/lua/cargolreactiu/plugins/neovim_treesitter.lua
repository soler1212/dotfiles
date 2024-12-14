-- Nvim Treesitter configurations and abstraction layer
-- https://github.com/nvim-treesitter/nvim-treesitter
return {
  "nvim-treesitter/nvim-treesitter",
  event = "VimEnter",
  dependencies = {
    "nvim-lua/plenary.nvim",
  },
  opts = {
    signs = true,
  },
}

