-- Keymapping for LazyGit
-- Consistent with other <leader>g (Git) mappings
vim.keymap.set('n', '<leader>gg', ':LazyGit<CR>', { noremap = true, silent = true, desc = 'Open LazyGit popup' })
