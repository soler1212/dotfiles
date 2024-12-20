local wk = require("which-key")

local opts = {
  preset = "classic", -- "classic", "modern", or "helix"
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
  { "<leader>gt", group = "Toggle"}, -- group
  { "<leader>m", group = "Mark"}, -- group
  { "<leader>mm", desc = "Toggle mark"}, -- group
  { "<leader>mc", desc = "Clear all marks in current buffer"}, -- group
  { "<leader>mp", desc = "Preview mark content"}, -- group
  { "<leader>md", desc = "Delete a letter mark"}, -- group
  { "<leader>ms", desc = "Set a letter mark"}, -- group
  {
    mode = { "n", "v" }, -- NORMAL and VISUAL mode
    { "<leader>q", "<cmd>qa<cr>", desc = "Quit" }, -- no need to specify mode since it's inherited
  }
})
wk.setup(opts)
