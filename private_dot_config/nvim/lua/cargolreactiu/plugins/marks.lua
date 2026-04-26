-- A better user experience for interacting with and manipulating Vim marks.
-- https://github.com/chentoast/marks.nvim
return {
  "chentoast/marks.nvim",
  commit = "f353e8c08c50f39e99a9ed474172df7eddd89b72", -- Congelat al commit funcional del sistema
  config = function()
    require("cargolreactiu.after.plugins.marks")
  end,
}
