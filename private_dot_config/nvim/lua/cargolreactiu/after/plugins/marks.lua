require'marks'.setup {
  -- whether to map keybinds or not. default true
  default_mappings = false,
  -- which builtin marks to show. default {}
  builtin_marks = { ".", "<", ">", "^" },
  -- whether movements cycle back to the beginning/end of buffer. default true
  cyclic = true,
  -- whether the shada file is updated after modifying uppercase marks. default false
  force_write_shada = false,
  -- how often (in ms) to redraw signs/recompute mark positions. 
  -- higher values will have better performance but may cause visual lag, 
  -- while lower values may cause performance penalties. default 150.
  refresh_interval = 250,
  -- sign priorities for each type of mark - builtin marks, uppercase marks, lowercase
  -- marks, and bookmarks.
  -- can be either a table with all/none of the keys, or a single number, in which case
  -- the priority applies to all marks.
  -- default 10.
  sign_priority = { lower=10, upper=15, builtin=8, bookmark=20 },
  -- disables mark tracking for specific filetypes. default {}
  excluded_filetypes = {

    'gitcommit',
    'gitrebase',
  },
  -- disables mark tracking for specific buftypes. default {}
  excluded_buftypes = {},
  -- marks.nvim allows you to configure up to 10 bookmark groups, each with its own
  -- sign/virttext. Bookmarks can be used to group together positions and quickly move
  -- across multiple buffers. default sign is '!@#$%^&*()' (from 0 to 9), and
  -- default virt_text is "".
  bookmark_0 = {
    sign = "⚑",
    virt_text = "hello world",
    -- explicitly prompt for a virtual line annotation when setting a bookmark from this group.
    -- defaults to false.
    annotate = false,
  },
  mappings = {
    toggle = "<leader>mm",
    delete_buf = "<leader>mc",
    preview = "<leader>mp",
    set = "<leader>ms",
    delete = "<leader>mu",
    -- set_bookmark1 = "<leader>mg1", per ara no vull complicar massa la cosa, pero pots fer marques del mateix tipus i saltar automaticament a cada una
    -- delete_bookmark1 = "<leader>mt",
    -- next = "]m",
    -- prev = "[m",

  }
}

vim.api.nvim_set_keymap("n", "<leader>mlb", "<cmd>MarksListBuf<CR>", { noremap = true, silent = true })
vim.api.nvim_set_keymap("n", "<leader>mla", "<cmd>MarksListAll<CR>", { noremap = true, silent = true })
