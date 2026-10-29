-- Current nvim-treesitter API for Neovim 0.12+.
return {
  "nvim-treesitter/nvim-treesitter",
  branch = "main",
  build = ":TSUpdate",
  lazy = false,
  config = function()
    require("cargolreactiu.after.plugins.treesitter")
  end,
}
