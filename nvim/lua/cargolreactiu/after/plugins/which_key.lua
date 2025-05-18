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
  -- File keymaps
  { "<leader>f",   { name = "file" } },
  { "<leader>fo",  { name = "other" } },

  -- Buffer keymaps
  { "<leader>b",   { name = "buffer" } },
  { "<leader>bg",  { name = "go to" } },
  { "<leader>bm",  { name = "move" } },
  { "<leader>bo",  { name = "order" } },
  { "<leader>bc",  { name = "close" } },

  -- Session keymaps
  { "<leader>s",   { name = "Session" } },
  { "<leader>sd",  { name = "Delete" } },

  -- Git keymaps
  { "<leader>g",   { name = "Git" } },
  { "<leader>gt",  { name = "Toggle" } },
  { "<leader>gs",  { desc = "Stage current hunk" } },
  { "<leader>gr",  { desc = "Reset current hunk" } },
  { "<leader>gS",  { desc = "Stage all changes in buffer" } },
  { "<leader>gu",  { desc = "Undo last staged hunk" } },
  { "<leader>gR",  { desc = "Reset all changes in buffer" } },
  { "<leader>gp",  { desc = "Preview current hunk" } },
  { "<leader>gb",  { desc = "Show detailed blame for current line" } },
  { "<leader>gd",  { desc = "Show diff against index" } },
  { "<leader>gD",  { desc = "Show diff against previous commit" } },
  { "<leader>gtl", { desc = "Toggle inline blame annotations" } },
  { "<leader>gtx", { desc = "Toggle display of deleted lines" } },


  -- Mark keymaps
  { "<leader>m",   { name = "Mark" } },
  { "<leader>mm",  desc = "Toggle mark" },
  { "<leader>mc",  desc = "Clear all marks in current buffer" },
  { "<leader>mp",  desc = "Preview mark content" },
  { "<leader>md",  desc = "Delete a letter mark" },
  { "<leader>ms",  desc = "Set a letter mark" },
  { "<leader>ml",  desc = "List marks" },
  { "<leader>mt",  desc = "Todo Comments" },
  { "<leader>mlb", desc = "List Marks in current buffer" },
  { "<leader>mla", desc = "List Marks in all buffers" },


  -- Tabs keymaps
  { "<leader>t",   { name = "Tabs" } },

  -- LSP keymaps
  { "<leader>l",   { name = "LSP" } },
  { "<leader>ls",  { name = "Saga" } },
  { "<leader>lt",  { name = "Trouble" } },
  { "<leader>lM",  { desc = "Go to previous diagnostic [M]essage" } },
  { "<leader>lm",  { desc = "Go to next diagnostic [M]essage" } },
  { "<leader>ld",  { desc = "Show diagnostic [E]rror messages" } },
  { "<leader>lq",  { desc = "Open diagnostic [Q]uickfix list" } },
})

wk.setup(opts)
