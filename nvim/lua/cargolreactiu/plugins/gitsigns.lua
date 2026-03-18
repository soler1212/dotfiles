-- Git integration for buffers
-- https://github.com/lewis6991/gitsigns.nvim
return {
  "lewis6991/gitsigns.nvim",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
    require("cargolreactiu.after.plugins.gitsigns")
  end
}
