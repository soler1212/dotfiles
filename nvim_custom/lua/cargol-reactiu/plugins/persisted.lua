return {
  'olimorris/persisted.nvim',
  lazy = false,
  config = function()
    require('telescope').load_extension 'persisted'

    require('persisted').setup {
      autosave = true,
      autoload = true,
      follow_cwd = true,
      --      on_autoload_no_session = function()
      --       vim.notify 'No existing session to load'
      --     end,
      use_git_branch = false,

      --on_autoload_no_session = function()
      --  vim.cmd 'Neotree close' -- Ensure Neo-tree is closed if no session is found
      --end,
      --after_source = function()
      --  -- Close the Neo-tree buffer after a session is restored
      --  vim.api.nvim_command 'bwipeout neo-tree\\ filesystem\\ [1]'
      --end,
    }

    --local group = vim.api.nvim_create_augroup('PersistedHooks', {})
    --vim.api.nvim_create_autocmd({ 'User' }, {
    --  pattern = 'PersistedSavePre',
    --  group = group,
    --  callback = function(session)
    --    print 'imbecil'
    --    -- Save the currently loaded session using a global variable:
    --    require('persisted').save(session)

    --    -- require('neo-tree.command').execute { 'close' }
    --    -- require('neo-tree.command').execute { 'show' }

    --    -- Delete all of the open buffers
    --    vim.api.nvim_input '<ESC>:%bd!<CR>'
    --    -- vim.api.nvim_input '<ESC>:Neotree close<CR>'
    --  end,
    --})

    vim.keymap.set('n', '<leader>Sl', ':Telescope persisted<CR>', { desc = '[L]ist saved sessions' })
    vim.keymap.set('n', '<leader>Sd', ':SessionDelete<CR>', { desc = '[D]elete current session' })
    vim.keymap.set('n', '<leader>Ss', ':SessionLoad<CR>', { desc = 'Load current [S]ession' })
    vim.keymap.set('n', '<leader>SS', ':SessionSave<CR>', { desc = '[S]ave current session' })
  end,
}
