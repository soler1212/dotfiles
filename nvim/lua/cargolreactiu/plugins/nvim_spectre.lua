-- Find the enemy and replace them with dark power.
-- https://github.com/nvim-pack/nvim-spectre
return {
  "nvim-pack/nvim-spectre",
  config = function()
    require("cargolreactiu.after.plugins.nvim_spectre")
  end,
}
