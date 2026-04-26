-- Displays a popup with possible keybindings of the command you started typing.
-- https://github.com/folke/which-key.nvim
return {
  "folke/which-key.nvim",
  tag = "v3.13.2", -- Congelat a la branca v3 estable per a 0.11
  event = "VeryLazy",
  config = function()
    require("cargolreactiu.after.plugins.which_key")
  end,
}
