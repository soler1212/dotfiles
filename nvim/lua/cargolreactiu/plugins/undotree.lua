-- The undo history visualizer for VIM
-- https://github.com/mbbill/undotree
return {
  "mbbill/undotree",
  config = function()
    require("cargolreactiu.after.plugins.undotree")
  end,
}
