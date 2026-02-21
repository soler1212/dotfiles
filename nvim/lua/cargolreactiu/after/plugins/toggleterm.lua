-- Persistent terminal instances for AI CLIs
-- Using toggleterm.nvim with more default-like behavior
local Terminal = require('toggleterm.terminal').Terminal

-- Helper to create persistent AI terminals
local function create_ai_term(cmd_name)
  return Terminal:new({
    cmd = cmd_name,
    hidden = true,
    direction = "float",
    float_opts = {
      border = "curved",
    },
    -- Keep session alive
    close_on_exit = true,
  })
end

-- Create instances
local codex_term = create_ai_term("codex")
local gemini_term = create_ai_term("gemini")
local claude_term = create_ai_term("claude")

-- Toggle functions
function _CODEX_TOGGLE() codex_term:toggle() end
function _GEMINI_TOGGLE() gemini_term:toggle() end
function _CLAUDE_TOGGLE() claude_term:toggle() end

-- Keymappings <leader>i
local opts = { noremap = true, silent = true }
vim.keymap.set('n', '<leader>ic', '<cmd>lua _CODEX_TOGGLE()<CR>', vim.tbl_extend('force', opts, { desc = 'Open Codex CLI' }))
vim.keymap.set('n', '<leader>ig', '<cmd>lua _GEMINI_TOGGLE()<CR>', vim.tbl_extend('force', opts, { desc = 'Open Gemini CLI' }))
vim.keymap.set('n', '<leader>ia', '<cmd>lua _CLAUDE_TOGGLE()<CR>', vim.tbl_extend('force', opts, { desc = 'Open Claude CLI' }))

-- Terminal-specific keymaps
function _G.set_terminal_keymaps()
  local opts = {buffer = 0}
  -- 1. Si estás en modo terminal, ESC te saca al modo normal
  vim.keymap.set('t', '<Esc>', [[<C-\><C-n>]], opts)
  -- 2. SI ESTÁS EN MODO NORMAL, ESC TE VUELVE A METER AL MODO TERMINAL (INSERTAR)
  vim.keymap.set('n', '<Esc>', [[i]], opts)

  -- Navigation mappings while in terminal
  vim.keymap.set('t', '<C-h>', [[<Cmd>wincmd h<CR>]], opts)
  vim.keymap.set('t', '<C-j>', [[<Cmd>wincmd j<CR>]], opts)
  vim.keymap.set('t', '<C-k>', [[<Cmd>wincmd k<CR>]], opts)
  vim.keymap.set('t', '<C-l>', [[<Cmd>wincmd l<CR>]], opts)
end

-- Apply these keymaps only to toggleterm buffers
vim.cmd('autocmd! TermOpen term://*toggleterm#* lua set_terminal_keymaps()')

-- Auto-enter insert mode when focusing terminal
vim.api.nvim_create_autocmd({ "BufEnter", "BufWinEnter", "WinEnter" }, {
  pattern = "term://*toggleterm#*",
  callback = function()
    vim.cmd("startinsert")
  end,
})
