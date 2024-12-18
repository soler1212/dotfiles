-- builtin.setup({
--   auto_clean_after_session_restore = true,
-- })
local Path = require('plenary.path')
local config = require('session_manager.config')
require('session_manager').setup({
  sessions_dir = Path:new(vim.fn.stdpath('data'), 'sessions'), -- The directory where the session files will be saved.
  -- session_filename_to_dir = session_filename_to_dir, -- Function that replaces symbols into separators and colons to transform filename into a session directory.
  -- dir_to_session_filename = dir_to_session_filename, -- Function that replaces separators and colons into special symbols to transform session directory into a filename. Should use `vim.uv.cwd()` if the passed `dir` is `nil`.
  autoload_mode = config.AutoloadMode.LastSession, -- Define what to do when Neovim is started without arguments. See "Autoload mode" section below.
  autosave_last_session = true, -- Automatically save last session on exit and on session switch.
  autosave_ignore_not_normal = true, -- Plugin will not save a session when no buffers are opened, or all of them aren't writable or listed.
  autosave_ignore_dirs = {}, -- A list of directories where the session will not be autosaved.
  autosave_ignore_filetypes = { -- All buffers of these file types will be closed before the session is saved.
    'gitcommit',
    'gitrebase',
  },
  autosave_ignore_buftypes = {}, -- All buffers of these bufer types will be closed before the session is saved.
  autosave_only_in_session = false, -- Always autosaves session. If true, only autosaves after a session is active.
  max_path_length = 80,  -- Shorten the display path if length exceeds this threshold. Use 0 if don't want to shorten the path at all.
})



vim.keymap.set('n', '<leader>ss', '<cmd>SessionManager load_session<cr>', { desc = 'load Session'})
vim.keymap.set('n', '<leader>sl', '<cmd>SessionManager load_last_session<cr>', { desc = 'load Last session'})
vim.keymap.set('n', '<leader>sld', '<cmd>SessionManager load_current_dir_session<cr>', { desc = 'Load current Dir session'})
vim.keymap.set('n', '<leader>slg', '<cmd>SessionManager load_git_session<cr>', { desc = 'Load Git session'})
vim.keymap.set('n', '<leader>sw', '<cmd>SessionManager save_current_session<cr>', { desc = 'save current session'})
vim.keymap.set('n', '<leader>sds', '<cmd>SessionManager delete_session<cr>', { desc = 'select and Delete Session'})
vim.keymap.set('n', '<leader>sdc', '<cmd>SessionManager delete_current_dir_session<cr>', { desc = 'Delete Dir session'})
