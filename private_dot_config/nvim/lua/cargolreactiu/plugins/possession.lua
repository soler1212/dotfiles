-- Flexible session management for Neovim.
-- https://github.com/jedrzejboczar/possession.nvim
return {
  "jedrzejboczar/possession.nvim",
  commit = "fbea95b", -- Congelat al commit estable per a 0.11
  dependencies = { 'nvim-lua/plenary.nvim' },
  config = function()
    require("cargolreactiu.after.plugins.possession")
  end,
}
