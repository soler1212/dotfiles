-- Persistent terminal instances for AI CLIs
-- This file handles the logic and persistence. Mappings are in mappings.lua
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

-- Create instances (Global so mappings.lua can access them via _G)
_G.codex_term = create_ai_term("codex")
_G.gemini_term = create_ai_term("gemini")
_G.claude_term = create_ai_term("claude")

-- Toggle functions
function _G._CODEX_TOGGLE() _G.codex_term:toggle() end
function _G._GEMINI_TOGGLE() _G.gemini_term:toggle() end
function _G._CLAUDE_TOGGLE() _G.claude_term:toggle() end

-- Terminal-specific keymaps (Internal behavior)
function _G.set_terminal_keymaps()
  local opts = {buffer = 0}
  -- Escape to normal mode
  vim.keymap.set('t', '<Esc>', [[<C-\><C-n>]], opts)
  -- Escape in normal mode back to insert
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
