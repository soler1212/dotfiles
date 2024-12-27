
vim.keymap.set('n', '<leader>ltd', '<cmd>Trouble diagnostics toggle<cr>', { desc = 'Diagnostics (Trouble)'})
vim.keymap.set('n', '<leader>ltD', '<cmd>Trouble diagnostics toggle filter.buf=0<cr>', { desc = 'Buffer Diagnostics (Trouble)'})
vim.keymap.set('n', '<leader>lts', '<cmd>Trouble symbols toggle focus=false<cr>', { desc = 'Symbols (Trouble)'})
vim.keymap.set('n', '<leader>ltl', '<cmd>Trouble lsp toggle focus=false win.position=right<cr>', { desc = 'LSP Definitions / references / ... (Trouble)'})
vim.keymap.set('n', '<leader>ltL', '<cmd>Trouble loclist toggle<cr>', { desc = 'Location List (Trouble)'})
vim.keymap.set('n', '<leader>ltQ', '<cmd>Trouble qflist toggle<cr>', { desc = 'Quickfix List (Trouble)'})
