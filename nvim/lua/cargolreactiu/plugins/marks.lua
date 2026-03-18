-- A better user experience for viewing and interacting with Vim marks.
-- https://github.com/chentoast/marks.nvim
return {
  "chentoast/marks.nvim",
  event = "VeryLazy",
  config = function()
    require("cargolreactiu.after.plugins.marks")
  end
}
