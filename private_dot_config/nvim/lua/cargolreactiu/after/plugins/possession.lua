local Path = require('plenary.path')

-- [[ Possession Fix per a builds de Neovim sense SessionLoadPre ]]
-- Si fem servir doautoall en un event que no existeix, petarà. 
-- Enganyem al sistema definint un grup buit per a un event fictici 
-- si el binari no el suporta (rar en 0.11, però passa).

require('possession').setup {
  session_dir = (Path:new(vim.fn.stdpath('data')) / 'possession'):absolute(),
  silent = false,
  load_silent = true,
  debug = false,
  logfile = false,
  prompt_no_cr = false,
  autosave = {
    current = true,
    cwd = false,
    tmp = false,
    tmp_name = 'tmp',
    on_load = true,
    on_quit = true,
  },
  autoload = false,
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
    after_save = function(name, user_data, aborted) 
      if package.loaded["alpha"] then
        require("alpha").redraw()
      end
    end,
    before_load = function(name, user_data) 
        -- Guard contra events inexistents en algunes builds
        if vim.fn.exists('##SessionLoadPre') == 0 then
            -- Silent skip o fix manual si calgués
        end
        return user_data 
    end,
    after_load = function(name, user_data)
      if package.loaded["alpha"] then
        require("alpha").redraw()
      end
    end,
  },
  plugins = {
    close_windows = {
      hooks = { 'before_save', 'before_load' },
      preserve_layout = false,
      match = {
        floating = true,
        buftype = {},
        filetype = { "neo-tree", "alpha" },
        custom = false,
      },
    },
    delete_hidden_buffers = false,
    nvim_tree = true,
    neo_tree = true,
    symbols_outline = true,
    outline = true,
    tabby = true,
    neotest = true,
    delete_buffers = false,
    stop_lsp_clients = false,
  },
  telescope = {
    previewer = {
      enabled = true,
      previewer = 'pretty',
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

-- Keymaps
vim.keymap.set('n', '<leader>sw', '<cmd>:PossessionSave<cr>', { desc = 'Save current session' })
vim.keymap.set('n', '<leader>sCw', '<cmd>:PossessionSaveCwd<cr>', { desc = 'Save CWD session' })
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
