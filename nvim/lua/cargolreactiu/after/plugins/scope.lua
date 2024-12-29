require("scope").setup({
})

-- Extension to show all buffers from all tabs.
require("telescope").load_extension("scope")


vim.keymap.set('n', '<leader>ft', '<cmd>:Telescope scope buffers<cr>', { desc = 'All tab buffers'})

vim.keymap.set('n', '<leader>ta', '<cmd>:tabnew<cr>', { desc = 'New tab'})
vim.keymap.set('n', '<leader>tc', '<cmd>:tabclose<cr>', { desc = 'Close tab'})
vim.keymap.set('n', '<leader>tp', '<cmd>:tabprev<cr>', { desc = 'previous tab'})
vim.keymap.set('n', '<leader>tn', '<cmd>:tabnext<cr>', { desc = 'next tab'})
vim.keymap.set('n', '<leader>tm', ':ScopeMoveBuf ', { desc = 'Move buffer to tab'})

