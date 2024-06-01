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
  },

  -- Telescope-Frecency -> https://github.com/nvim-telescope/telescope-frecency.nvim
  -- Millora l'ordre en que apereixen els fitxer de telescope, els ordenda per prioritat
  -- Els que has obert mes surtiran més amunt
  {
    "nvim-telescope/telescope-frecency.nvim",
    config = function()
      require("telescope").load_extension "frecency"
    end,
  }
}
