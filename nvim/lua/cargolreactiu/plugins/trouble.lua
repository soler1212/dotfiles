-- A pretty list for showing diagnostics, references, telescope results, quickfix and location lists.
-- https://github.com/folke/trouble.nvim
return {
  "folke/trouble.nvim",
  tag = "v3.6.0", -- Congelat a la versió estable
  cmd = "Trouble",
  config = function()
    require("cargolreactiu.after.plugins.trouble")
  end,
}
