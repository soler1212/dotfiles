local Path = require('plenary.path')
require('possession').setup {
  sessions_dir = Path:new(vim.fn.stdpath('data'), 'possession'):absolute(), -- The directory where the session files will be saved.
  silent = false,
  load_silent = true,
  debug = false,
  logfile = false,
  prompt_no_cr = false,
  autosave = {
    current = true,  -- or fun(name): boolean
    cwd = false,      -- or fun(): boolean
    tmp = false,      -- or fun(): boolean
    tmp_name = 'tmp', -- or fun(): string
    on_load = true,
    on_quit = true,
  },
  autoload = "last", -- or 'last' or 'auto_cwd' or 'last_cwd' or fun(): string
  commands = {
    save = 'PossessionSave',
    load = 'PossessionLoad',
    save_cwd = 'PossessionSaveCwd',
    load_cwd = 'PossessionLoadCwd',
    rename = 'PossessionRename',
    close = 'PossessionClose',
    delete = 'PossessionDelete',
    show = 'PossessionShow',
    list = 'PossessionList',
    list_cwd = 'PossessionListCwd',
    migrate = 'PossessionMigrate',
  },
  hooks = {
    before_save = function(name) return {} end,
    after_save = function(name, user_data, aborted) end,
    before_load = function(name, user_data) return user_data end,
    after_load = function(name, user_data) end,
  },
  plugins = {
    close_windows = {
      hooks = { 'before_save', 'before_load' },
      preserve_layout = true, -- or fun(win): boolean
      match = {
        floating = true,
        buftype = {},
        filetype = {},
        custom = false, -- or fun(win): boolean
      },
    },
    delete_hidden_buffers = {
      hooks = {
        'before_load',
        vim.o.sessionoptions:match('buffer') and 'before_save',
      },
      force = false, -- or fun(buf): boolean
    },
    nvim_tree = true,
    neo_tree = true,
    symbols_outline = true,
    outline = true,
    tabby = true,
    dap = true,
    dapui = true,
    neotest = true,
    delete_buffers = false,
    stop_lsp_clients = false,
  },
  telescope = {
    previewer = {
      enabled = true,
      previewer = 'pretty', -- or 'raw' or fun(opts): Previewer
      wrap_lines = true,
      include_empty_plugin_data = false,
      cwd_colors = {
        cwd = 'Comment',
        tab_cwd = { '#cc241d', '#b16286', '#d79921', '#689d6a', '#d65d0e', '#458588' }
      }
    },
    list = {
      default_action = 'load',
      mappings = {
        save = { n = '<c-x>', i = '<c-x>' },
        load = { n = '<c-v>', i = '<c-v>' },
        delete = { n = '<c-t>', i = '<c-t>' },
        rename = { n = '<c-r>', i = '<c-r>' },
      },
    },
  },
}

-- Show the current session name at the lualine status
local function session_name()
  return require('possession.session').get_session_name() or ''
end
require("lualine").setup {
  sections = { lualine_a = { session_name } }
}


vim.keymap.set('n', '<leader>sw', '<cmd>:PossessionSave<cr>', { desc = 'Save current session' })
vim.keymap.set('n', '<leader>sw', '<cmd>:PossessionSaveCwd<cr>', { desc = 'Save CWD session' })
vim.keymap.set('n', '<leader>sl', '<cmd>:Telescope possession list<cr>', { desc = 'list Sessions' })
vim.keymap.set('n', '<leader>ss', '<cmd>:PossessionLoad<cr>', { desc = 'load Last Session' })
vim.keymap.set('n', '<leader>sc', '<cmd>:PossessionLoadCwd<cr>', { desc = 'Load CWD session' })
vim.keymap.set('n', '<leader>sd', '<cmd>:PossessionDelete<cr>', { desc = 'Delete Current Session' })
vim.keymap.set('n', '<leader>sr', '<cmd>:PossessionRename<cr>', { desc = 'Possession Rename' })
vim.keymap.set('n', '<leader>sx', '<cmd>:PossessionClose<cr>', { desc = 'Possession close' })
vim.keymap.set('n', '<leader>sCc', '<cmd>:PossessionShow<cr>', { desc = 'Possession Session Configuration' })
vim.keymap.set('n', '<leader>sCl', '<cmd>:PossessionList<cr>', { desc = 'Possession Session List' })
vim.keymap.set('n', '<leader>sCw', '<cmd>:PossessionListCwd<cr>', { desc = 'Possession Session List CWD' })
vim.keymap.set('n', '<leader>sCm', '<cmd>:PossessionMigrate<cr>', { desc = 'Possession Migrate' })
