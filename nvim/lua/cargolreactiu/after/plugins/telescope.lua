local builtin = require('telescope.builtin')
vim.keymap.set('n', '<leader>ff', builtin.find_files, { desc = 'Find Files' })
vim.keymap.set('n', '<leader>fw', builtin.live_grep, { desc = 'Find Word in files' })
vim.keymap.set('n', '<leader>fb', builtin.buffers, { desc = 'Find Buffers' })
vim.keymap.set('n', '<leader>fh', builtin.help_tags, { desc = 'Find Help tags' })
vim.keymap.set('n', '<leader>fg', builtin.git_files, { desc = 'Find Git files' })
vim.keymap.set('n', '<leader>fot', builtin.colorscheme, { desc = 'Find colorscheme' })
vim.keymap.set('n', '<leader>ps', function()
  builtin.grep_string({ search = vim.fn.input("Grep > ") });
end)

-- INFO: https://github.com/nvim-telescope/telescope-ui-select.nvim
require("telescope").setup {
  pickers = {
    colorscheme = {
      enable_preview = true,
    }
  }, 
  extensions = {
    ["ui-select"] = {
      require("telescope.themes").get_dropdown {}
    }
  }
}
-- To get ui-select loaded and working with telescope, you need to call
-- load_extension, somewhere after setup function:
require("telescope").load_extension("ui-select")

