-- [[ Basic Keymaps ]]
--  See `:help vim.keymap.set()`
-- Set highlight on search, but clear on pressing <Esc> in normal mode
vim.opt.hlsearch = true
vim.keymap.set('n', '<Esc>', '<cmd>nohlsearch<CR>')
vim.keymap.set('n', 'x', '"_x') -- Do not yank with x
vim.keymap.set('n', '<C-a>', 'gg<S-v>G') -- Select all
vim.keymap.set('n', '<C-s>', ':w<cr>') -- Guardar file

--  See `:help wincmd` for a list of all window commands
vim.keymap.set('n', '<C-h>', '<C-w><C-h>', { desc = 'Move focus to the left window' })
vim.keymap.set('n', '<C-l>', '<C-w><C-l>', { desc = 'Move focus to the right window' })
vim.keymap.set('n', '<C-j>', '<C-w><C-j>', { desc = 'Move focus to the lower window' })
vim.keymap.set('n', '<C-k>', function()
  local up = vim.fn.winnr('k')
  if up ~= 0 then
    vim.cmd('wincmd k')
    return
  end

  if #vim.lsp.get_clients({ bufnr = 0 }) > 0 then
    if vim.fn.exists(':Lspsaga') == 2 then
      local ok = pcall(vim.cmd, 'Lspsaga hover_doc')
      if ok then
        return
      end
    end
    vim.lsp.buf.hover()
  end
end, { desc = 'Move focus up (or hover)' })

vim.keymap.set('n', '<leader>ll', function()
  require('cargolreactiu.devpanel').open()
end, { desc = 'Dev panel' })

-- Dev panel helpers under <leader>l…
vim.keymap.set('n', '<leader>lm', '<cmd>Mason<CR>', { desc = 'Mason' })
vim.keymap.set('n', '<leader>li', '<cmd>LspInfo<CR>', { desc = 'LspInfo' })
vim.keymap.set('n', '<leader>lR', '<cmd>LspRestart<CR>', { desc = 'LspRestart' })

-- Diagnostics (core)
vim.keymap.set('n', '<leader>ldd', function()
  vim.diagnostic.open_float(nil, { focus = false })
end, { desc = 'Diagnostics float' })
vim.keymap.set('n', '<leader>ldp', vim.diagnostic.goto_prev, { desc = 'Diagnostics prev' })
vim.keymap.set('n', '<leader>ldn', vim.diagnostic.goto_next, { desc = 'Diagnostics next' })
vim.keymap.set('n', '<leader>ldq', function()
  vim.diagnostic.setqflist()
  vim.cmd('copen')
end, { desc = 'Diagnostics quickfix' })
vim.keymap.set('n', '<leader>ldl', function()
  vim.diagnostic.setloclist()
  vim.cmd('lopen')
end, { desc = 'Diagnostics loclist' })

-- Trouble shortcuts (optional, plugin lazy-loads on :Trouble)
vim.keymap.set('n', '<leader>ltd', '<cmd>Trouble diagnostics toggle<CR>', { desc = 'Trouble diagnostics' })
vim.keymap.set(
  'n',
  '<leader>ltD',
  '<cmd>Trouble diagnostics toggle filter.buf=0<CR>',
  { desc = 'Trouble buffer diagnostics' }
)
vim.keymap.set('n', '<leader>lts', '<cmd>Trouble symbols toggle focus=false<CR>', { desc = 'Trouble symbols' })
vim.keymap.set(
  'n',
  '<leader>ltl',
  '<cmd>Trouble lsp toggle focus=false win.position=right<CR>',
  { desc = 'Trouble LSP list' }
)
vim.keymap.set('n', '<leader>ltQ', '<cmd>Trouble qflist toggle<CR>', { desc = 'Trouble quickfix' })
vim.keymap.set('n', '<leader>ltL', '<cmd>Trouble loclist toggle<CR>', { desc = 'Trouble loclist' })

vim.keymap.set('n', '<leader>a', ':Alpha<CR>', { desc = 'Open dashboard', silent = true })

-- [[ External Tools Mappings ]]

-- LazyGit
vim.keymap.set('n', '<leader>gg', ':LazyGit<CR>', { noremap = true, silent = true, desc = '🚀 [G]it TUI (LazyGit)' })

-- AI / Intelligence Interfaces (<leader>i)
local opts = { noremap = true, silent = true }
vim.keymap.set('n', '<leader>ic', '<cmd>lua _CODEX_TOGGLE()<CR>', vim.tbl_extend('force', opts, { desc = '🚀 AI Codex CLI' }))
vim.keymap.set('n', '<leader>ig', '<cmd>lua _GEMINI_TOGGLE()<CR>', vim.tbl_extend('force', opts, { desc = '♊ AI Gemini CLI' }))
vim.keymap.set('n', '<leader>ia', '<cmd>lua _CLAUDE_TOGGLE()<CR>', vim.tbl_extend('force', opts, { desc = '🤖 AI Claude CLI' }))
