-- Nvim Treesitter (Rama master - Congelada para Neovim 0.11.x)
return {
  "nvim-treesitter/nvim-treesitter",
  branch = "master",
  commit = "cf12346a", -- Commit estable documentat
  build = ":TSUpdate",
  lazy = false,
  config = function()
    require("cargolreactiu.after.plugins.treesitter")
  end,
}
