return {
  'olimorris/persisted.nvim',
  lazy = false,
  config = function()
    require('telescope').load_extension 'persisted'

    require('persisted').setup {
      autoload = true,
      follow_cwd = true,
      on_autoload_no_session = function()
        vim.notify 'No existing session to load'
      end,
      use_git_branch = false,
    }

    --local group = vim.api.nvim_create_augroup('PersistedHooks', {})
    --vim.api.nvim_create_autocmd({ 'User' }, {
    --  pattern = 'PersistedTelescopeLoadPre',
    --  group = group,
    --  callback = function(session)
    --    -- Save the currently loaded session using a global variable:
    --    --require('persisted').save { session = vim.g.persisted_loaded_session }

    --    --require('neo-tree.command').execute { 'close' }
    --    -- require('neo-tree.command').execute { 'show' }

    --    -- Delete all of the open buffers
    --    -- vim.api.nvim_input '<ESC>:%bd!<CR>'
    --    vim.api.nvim_input '<ESC>:Neotree close<CR>'
    --  end,
    --})

    vim.keymap.set('n', '<leader>Sl', ':Telescope persisted<CR>', { desc = '[L]ist saved sessions' })
    vim.keymap.set('n', '<leader>Sd', ':SessionDelete<CR>', { desc = '[D]elete current session' })
    vim.keymap.set('n', '<leader>Ss', ':SessionLoad<CR>', { desc = 'Load current [S]ession' })
    vim.keymap.set('n', '<leader>SS', ':SessionSave<CR>', { desc = '[S]ave current session' })
  end,
}
