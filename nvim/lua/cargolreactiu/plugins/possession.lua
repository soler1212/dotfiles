-- Flexible session management for Neovim.
-- https://github.com/jedrzejboczar/possession.nvim
return {
  "jedrzejboczar/possession.nvim",
  dependencies = { 'nvim-lua/plenary.nvim' },
  config = function()
    require("cargolreactiu.after.plugins.possession")
  end,
}
