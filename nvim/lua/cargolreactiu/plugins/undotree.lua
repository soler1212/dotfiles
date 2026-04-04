-- The ultimate undo history visualizer for VIM.
-- https://github.com/mbbill/undotree
return {
  "mbbill/undotree",
  commit = "6fa6b57cda8459e1e4b2ca34df702f55242f4e4d", -- Congelat al commit funcional del sistema
  config = function()
    require("cargolreactiu.after.plugins.undotree")
  end,
}
