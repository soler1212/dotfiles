return {
  --  TODO COMMENTS -----------------------------------------------------------
  --  Highlight, list and search todo comments in your projects
  --  https://github.com/folke/todo-comments.nvim
  {
    "folke/todo-comments.nvim",
    event = "VimEnter",
    dependencies = {
      "nvim-lua/plenary.nvim",
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
    config = function() require("telescope").load_extension("frecency") end,
  },

  -- {
  --   "pmizio/typescript-tools.nvim",
  --   dependencies = { "nvim-lua/plenary.nvim", "neovim/nvim-lspconfig" },
  --   opts = {},
  -- }

  -- Swenv -> https://github.com/AckslD/swenv.nvim
  -- Per canviar rapidament de virtual environment de python
  -- { TODO: No funciona be amb el plugin de lsp, es descativa el plugin de LSP
  --   "AckslD/swenv.nvim",
  --   config = function()
  --     require("swenv").setup({
  --       venvs_path = vim.fn.expand('~/.virtualenvs'), -- Carpeta on busca els venv
  --       -- post_set_venv = function()                    -- reiniciar lsp quan canvies de venv
  --       --   vim.cmd("LspRestart")
  --       -- end
  --     })
  --   end
  -- },

  -- https://github.com/sophacles/vim-bundle-mako
  -- Format per el files makos
  {
    "sophacles/vim-bundle-mako",
  },
  -- https://github.com/r-cha/encourage.nvim
  -- Motivational texts
  {
    "r-cha/encourage.nvim",
    config = true,
  },
  -- https://github.com/rachartier/tiny-inline-diagnostic.nvim
  -- Prettier diagnostic messages
  {
    "rachartier/tiny-inline-diagnostic.nvim",
    event = "VeryLazy", -- Or `LspAttach`
    priority = 1000, -- needs to be loaded in first
    config = function()
      require("tiny-inline-diagnostic").setup({
        options = {
          -- If multiple diagnostics are under the cursor, display all of them.
          multiple_diag_under_cursor = true,
          -- Enable diagnostic message on all lines.
          multilines = true,
        },
      })
    end,
  },
  {
    "ThePrimeagen/harpoon",
    dependencies = {
      "nvim-lua/plenary.nvim",
    },
  }
}
