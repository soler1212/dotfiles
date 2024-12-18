local wk = require("which-key")

local opts = {
  preset = "modern", -- "classic", "modern", or "helix"
  icons = {
    group = vim.g.icons_enabled ~= false and "" or "+",
    separator = "->",
  },
}

-- Define custom keybindings
wk.add({
  { "<leader>f", group = "file" }, -- group
  { "<leader>b", group = "buffer" }, -- group
  { "<leader>bg", group = "go to" }, -- group
  { "<leader>bm", group = "move" }, -- group
  { "<leader>bo", group = "order" }, -- group
  { "<leader>bc", group = "close" }, -- group
  { "<leader>s", group = "Session" }, -- group
  { "<leader>sd", group = "Delete"}, -- group
  { "<leader>g", group = "Git"}, -- group
  { "<leader>gh", group = "Hunk"}, -- group
  { "<leader>gt", group = "Toggle"}, -- group
  {
    mode = { "n", "v" }, -- NORMAL and VISUAL mode
    { "<leader>q", "<cmd>q<cr>", desc = "Quit" }, -- no need to specify mode since it's inherited
  }
})
wk.setup(opts)

