require("todo-comments").setup({

})


vim.keymap.set('n', '<leader>mtt', '<cmd>:Trouble todo filter = {tag = {TODO}}<cr>', { desc = 'List TODOs'})
vim.keymap.set('n', '<leader>mtf', '<cmd>:Trouble todo filter = {tag = {FIX,FIXME}}<cr>', { desc = 'List FIXMEs'})
vim.keymap.set('n', '<leader>mtw', '<cmd>:Trouble todo filter = {tag = {WARNING}}<cr>', { desc = 'List WARNINGs'})
vim.keymap.set('n', '<leader>mtr', '<cmd>:Trouble todo filter = {tag = {HACK,PERF,NOTE}}<cr>', { desc = 'List HACKs, PERFs, NOTEs'})
vim.keymap.set('n', '<leader>mta', '<cmd>:TodoTelescope<cr>', { desc = 'List All'})




