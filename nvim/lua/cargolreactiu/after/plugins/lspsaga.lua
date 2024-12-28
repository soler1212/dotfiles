require('lspsaga').setup({
  ightbulb = {
    enable = true,       -- Manté activat el lightbulb
    sign = false,        -- Deshabilita el lightbulb de la sign column (part esquerra)
    virtual_text = true, -- Opcional: pots activar el text virtual si vols
  },
})

vim.keymap.set('n', '<leader>lsi', '<cmd>:Lspsaga incoming_calls<cr>', { desc = 'Callhierarcy incoming' })
vim.keymap.set('n', '<leader>lso', '<cmd>:Lspsaga outgoing_calls<cr>', { desc = 'Callhierarcy outgoing' })
vim.keymap.set('n', '<leader>lsa', '<cmd>:Lspsaga code_action<cr>', { desc = 'Code actions' })
vim.keymap.set('n', '<leader>lsd', '<cmd>:Lspsaga peek_definition<cr>', { desc = 'Definition' })
vim.keymap.set('n', '<leader>lsD', '<cmd>:Lspsaga peek_type_definition<cr>', { desc = 'Type Definition' })
vim.keymap.set('n', '<leader>lsf', '<cmd>:Lspsaga finder<cr>', { desc = 'Finder' })
vim.keymap.set('n', '<leader>lsK', '<cmd>:Lspsaga hover_doc<cr>', { desc = 'Documentation' })
vim.keymap.set('n', '<leader>lsO', '<cmd>:Lspsaga outline<cr>', { desc = 'Outline' })
vim.keymap.set('n', '<leader>lsr', '<cmd>:Lspsaga rename<cr>', { desc = 'Rename' })
