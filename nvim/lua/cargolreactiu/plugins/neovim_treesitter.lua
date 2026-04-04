-- Nvim Treesitter (Rama master - Estable para Neovim 0.11.x)
return {
  "nvim-treesitter/nvim-treesitter",
  branch = "master", -- Tornem a la versió estable
  build = ":TSUpdate",
  lazy = false,
  config = function()
    require("cargolreactiu.after.plugins.treesitter")
  end,
}
