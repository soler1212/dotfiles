return {
  "nvim-treesitter/nvim-treesitter",
  branch = "master", -- Master es estable y compatible con 0.12
  build = ":TSUpdate",
  lazy = false,
  config = function()
    require("cargolreactiu.after.plugins.treesitter")
  end,
}
