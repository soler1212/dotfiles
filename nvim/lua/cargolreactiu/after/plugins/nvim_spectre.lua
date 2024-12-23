vim.keymap.set('n', '<leader>fR', function() require("spectre").toggle() end, { desc = 'Open diagnostic [Q]uickfix list'})
vim.keymap.set('n', '<leader>fr', function() require("spectre").toggle({ path = vim.fn.expand("%:t:p") }) end, { desc = 'Find and replace word in buffer'})
