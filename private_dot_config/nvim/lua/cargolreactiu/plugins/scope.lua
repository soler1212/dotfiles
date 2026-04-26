-- Simple tab-scoping for buffers.
-- https://github.com/tiagovla/scope.nvim
return {
  "tiagovla/scope.nvim",
  commit = "228aabdb1b9cc74f0c0ccec88e79873857236e49", -- Congelat al commit funcional del sistema
  config = function()
    require("cargolreactiu.after.plugins.scope")
  end,
}
