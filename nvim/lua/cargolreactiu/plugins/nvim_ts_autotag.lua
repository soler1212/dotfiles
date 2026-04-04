-- Use treesitter to autoclose and autorename html tag.
-- https://github.com/windwp/nvim-ts-autotag
return {
  "windwp/nvim-ts-autotag",
  commit = "8e1c0a389f20bf7f5b0dd0e00306c1247bda2595", -- Congelat al commit funcional
  config = function()
    require("cargolreactiu.after.plugins.nvim_ts_autotag")
  end,
}
