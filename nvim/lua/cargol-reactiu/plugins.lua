lvim.plugins = {
  -- Trouble -> https://github.com/folke/trouble.nvim
  -- A pretty list for showing diagnostics, references, telescope results,
  -- quickfix and location lists to help you solve all the trouble your code is causing.
  {
    "folke/trouble.nvim",
    cmd = "TroubleToggle",
  },

  -- Typescript.nvim -> https://github.com/jose-elias-alvarez/typescript.nvim
  -- Afegeix comandes que ajuden quan treballes amb typescript com ara afegir
  -- import que falten, renombrar fitxer, borrar variables no usades, etc
  { 'jose-elias-alvarez/typescript.nvim' },
  -- Swenv -> https://github.com/AckslD/swenv.nvim
  -- Per canviar rapidament de virtual environment de python
  {
    "AckslD/swenv.nvim",
    config = function()
      require("swenv").setup({
        venvs_path = vim.fn.expand('~/.virtualenvs'), -- Carpeta on busca els venv
        post_set_venv = function()                    -- reiniciar lsp quan canvies de venv
          vim.cmd("LspRestart")
        end
      })
    end
  },
  -- Uns quants colorschemes(Mes que res per el lualine)
  -- { "lunarvim/lunar.nvim" },
  { "morhetz/gruvbox" },
  { "sainnhe/gruvbox-material" },
  { "sainnhe/sonokai" },
  { "sainnhe/edge" },
  { "tomasr/molokai" },
  { "ayu-theme/ayu-vim" },
  { "rebelot/kanagawa.nvim" },

  -- Todo-comments -> https://github.com/folke/todo-comments.nvim
  -- Resalta comentaris:
  -- TODO:
  -- HACK:
  -- PERF:
  -- NOTE:
  -- FIX:
  -- WARNING:
  {
    "folke/todo-comments.nvim",
    config = 'require("todo-comments").setup()',
  },
  -- Persistence -> https://github.com/folke/persistence.nvim
  -- Encarregat de guardar la sessio, aixi quan tornis després de tancar,
  -- ho tindràs tot igual
  {
    "folke/persistence.nvim",
    event = "BufReadPre",                                           -- this will only start session saving when an actual file was opened
    opts = {
      dir = vim.fn.expand(vim.fn.stdpath("state") .. "/sessions/"), -- directory where session files are saved
      options = { "buffers", "curdir", "tabpages", "winsize" },     -- sessionoptions used for saving
      pre_save = nil,                                               -- a function to call before saving the session
      save_empty = false,                                           -- don't save if there are no open file buffers
    }
  },
  -- Surround -> https://github.com/tpope/vim-surround
  -- Mapings per poder borrar, canviar i afegir entre parelles,
  -- Exemple entre 'Hello world', o <q>hello world</q>, etc
  {
    "tpope/vim-surround",
    dependencies = { "nvim-lua/plenary.nvim" },
  },
  -- Harpoon -> https://github.com/ThePrimeagen/harpoon
  -- Per navegar molt més ràpid entre files
  -- TODO: L'has de configurar
  {
    "ThePrimeagen/harpoon",
    branch = "harpoon2",
    dependencies = { "nvim-lua/plenary.nvim" }
  },
  -- Hop -> https://github.com/phaazon/hop.nvim
  -- Millora el tipic dt', mostra fins quin ' vols borrar
  {
    "phaazon/hop.nvim",
    branch = "v2",
    config = function()
      -- you can configure Hop the way you like here; see :h hop-config
      require('hop').setup()
    end
  },
  -- Telescope-Frecency -> https://github.com/nvim-telescope/telescope-frecency.nvim
  -- Millora l'ordre en que apereixen els fitxer de telescope, els ordenda per prioritat
  -- Els que has obert mes surtiran més amunt
  {
    "nvim-telescope/telescope-frecency.nvim",
    config = function()
      require("telescope").load_extension "frecency"
    end,
  },
  -- TrevJ -> https://github.com/AckslD/nvim-trevJ.lua
  -- Amb vim podem fer CONTROL + J i posa els elements en una sola linea, doncs be, aquest
  -- plugin fa la inversa, de una linea a mulilinea
  {
    'AckslD/nvim-trevJ.lua',
    config = 'require("trevj").setup()',
    -- optional call for configurating non-default filetypes etc
    init = function()
      vim.keymap.set('n', '<leader>j', function()
        require('trevj').format_at_cursor()
      end)
    end,
  },

  { "stevearc/dressing.nvim" },
  {
    "nvim-pack/nvim-spectre",
    config = function()
      require("spectre").setup({
        result_padding = "",
        default = {
          replace = {
            cmd = "sed"
          }
        }
      })
    end
  },
  -- A truecolor, solarized dark scolorscheme using colorbuddy
  {
    "svrana/neosolarized.nvim",
    dependencies = {
      "tjdevries/colorbuddy.nvim",
      lazy = false
    }, -- A colorschemes helper, make cool neovim color schemes
  },
  -- Status line (Lunar vim ja el porta instalat per defecte) https://www.lunarvim.org/es/docs/configuration/appearance/statusline
  -- {
  --   "nvim-lualine/lualine.nvim",
  --   dependencies = {
  --     "nvim-tree/nvim-web-devicons",
  --   }
  -- }
  -- LSP (Lunar vim ja el porta instalat per defecte) https://www.lunarvim.org/es/docs/troubleshooting#is-it-at-least-showing-up-in-lspinfo
  -- { "neovim/nvim-lspconfig"}
  -- Autopairs
  {
    "windwp/nvim-autopairs",
    config = function()
      require("nvim-autopairs").setup({
        event = "InsertEnter",
        config = true,
        disable_filetype = { 'TelescopePrompt', 'vim' }
      })
    end
  },
  -- Autopairs
  {
    "windwp/nvim-ts-autotag",
    config = function()
      require("nvim-ts-autotag").setup()
    end
  },
  -- Colors in the css files and so on
  {
    "norcalli/nvim-colorizer.lua",
    config = function()
      require("colorizer").setup({ '*' })
    end
  },
  -- Millorar els miisatges de LSP, es un LSP UI
  {
    "nvimdev/lspsaga.nvim",
    config = function()
      require("lspsaga").setup({
        definition = {
          keys = {
            edit = 'o'
          }
        }
      })
    end
  },
}
