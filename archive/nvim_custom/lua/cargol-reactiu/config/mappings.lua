-- [[ Basic Keymaps ]]
--  See `:help vim.keymap.set()`

-- Set highlight on search, but clear on pressing <Esc> in normal mode
vim.opt.hlsearch = true

-- Do not yank with x
vim.keymap.set('n', 'x', '"_x')
-- Select all
vim.keymap.set('n', '<C-a>', 'gg<S-v>G')

-- Close buffer
vim.keymap.set('n', '<leader>c', '<cmd>:BufferClose<CR>', { desc = '[C]lose buffer' })

vim.keymap.set('n', '<leader>q', ':qa<CR>', { desc = '[Q]uit editor' })

-- Guardar file
vim.keymap.set('n', '<C-s>', ':w<cr>')

vim.keymap.set('n', '<Esc>', '<cmd>nohlsearch<CR>')

-- Tab keymaps
vim.keymap.set('n', '<Tab>', '<cmd>:BufferNext<CR>')
vim.keymap.set('n', '<S-Tab>', '<cmd>:BufferPrevious<CR>')

vim.keymap.set('n', '<leader>bp', '<cmd>:BufferPin<CR>', { desc = '[P]in buffer' })
vim.keymap.set('n', '<leader>bl', '<cmd>:BufferOrderByLanguage<CR>', { desc = 'Order by [L]anguage' })
vim.keymap.set('n', '<leader>bd', '<cmd>:BufferOrderByDirectory<CR>', { desc = 'Order by [D]irectory' })
vim.keymap.set('n', '<leader>bp', '<cmd>:BufferMovePrevious<CR>', { desc = 'Move buffer [P]revious' })
vim.keymap.set('n', '<leader>bn', '<cmd>:BufferMoveNext<CR>', { desc = 'Move buffer [N]ext' })
vim.keymap.set('n', '<leader>br', '<cmd>:BufferRestore<CR>', { desc = '[R]estore buffer' })
vim.keymap.set('n', '<leader>bP', '<cmd>:BufferPick<CR>', { desc = '[P]ick buffer' })
vim.keymap.set('n', '<leader>bD', '<cmd>:BufferPickDelete<CR>', { desc = '[D]elete buffer' })

-- Diagnostic keymaps
vim.keymap.set('n', '<leader>lM', vim.diagnostic.goto_prev, { desc = 'Go to previous diagnostic [M]essage' })
vim.keymap.set('n', '<leader>lm', vim.diagnostic.goto_next, { desc = 'Go to next diagnostic [M]essage' })
vim.keymap.set('n', '<leader>le', vim.diagnostic.open_float, { desc = 'Show diagnostic [E]rror messages' })
vim.keymap.set('n', '<leader>lq', vim.diagnostic.setloclist, { desc = 'Open diagnostic [Q]uickfix list' })

-- Exit terminal mode in the builtin terminal with a shortcut that is a bit easier
-- for people to discover. Otherwise, you normally need to press <C-\><C-n>, which
-- is not what someone will guess without a bit more experience.
--
-- NOTE: This won't work in all terminal emulators/tmux/etc. Try your own mapping
-- or just use <C-\><C-n> to exit terminal mode
vim.keymap.set('t', '<Esc><Esc>', '<C-\\><C-n>', { desc = 'Exit terminal mode' })

-- TIP: Disable arrow keys in normal mode
-- vim.keymap.set('n', '<left>', '<cmd>echo "Use h to move!!"<CR>')
-- vim.keymap.set('n', '<right>', '<cmd>echo "Use l to move!!"<CR>')
-- vim.keymap.set('n', '<up>', '<cmd>echo "Use k to move!!"<CR>')
-- vim.keymap.set('n', '<down>', '<cmd>echo "Use j to move!!"<CR>')

-- Keybinds to make split navigation easier.
--  Use CTRL+<hjkl> to switch between windows
--
--  See `:help wincmd` for a list of all window commands
vim.keymap.set('n', '<C-h>', '<C-w><C-h>', { desc = 'Move focus to the left window' })
vim.keymap.set('n', '<C-l>', '<C-w><C-l>', { desc = 'Move focus to the right window' })
vim.keymap.set('n', '<C-j>', '<C-w><C-j>', { desc = 'Move focus to the lower window' })
vim.keymap.set('n', '<C-k>', '<C-w><C-k>', { desc = 'Move focus to the upper window' })

vim.keymap.set('n', ' e', 'Neotree toggle<CR>', { desc = 'Toogle file explorer' })
