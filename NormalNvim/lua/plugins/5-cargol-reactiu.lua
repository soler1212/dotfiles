return {
  --  TODO COMMENTS -----------------------------------------------------------
  --  Highlight, list and search todo comments in your projects
  --  https://github.com/folke/todo-comments.nvim
  {
  'folke/todo-comments.nvim',
  event = 'VimEnter',
  dependencies = {
    'nvim-lua/plenary.nvim',
  },
  opts = {
    signs = true,
  },
  }
}
