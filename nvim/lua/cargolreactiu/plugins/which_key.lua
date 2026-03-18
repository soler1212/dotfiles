return {
  "folke/which-key.nvim",
  event = "VeryLazy",
  config = function()
    require("cargolreactiu.after.plugins.which_key")
  end,
  keys = {
    {
      "<leader> ",
      function()
        require("which-key").show({ global = false })
      end,
      desc = "buffer keymaps",
    },
  },
}
