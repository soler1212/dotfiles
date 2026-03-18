---- Followed this instructions https://lsp-zero.netlify.app/docs/getting-started.html
return {
    -- Quickstart configs for Nvim LSP
    -- https://github.com/neovim/nvim-lspconfig
    {
      "neovim/nvim-lspconfig",
      dependencies = {
        "hrsh7th/cmp-nvim-lsp",
        "hrsh7th/cmp-buffer",
        "hrsh7th/cmp-path",
        "hrsh7th/nvim-cmp",
      },
      config = function()
        require("cargolreactiu.after.plugins.lsp")
      end
    },
    -- INFO: A partir d'aqui instala els ajudants per instalar automaticament els LSP mes info https://lsp-zero.netlify.app/docs/language-server-configuration.html#automatic-installs
    -- Portable package manager for Neovim that runs everywhere Neovim runs. Easily install and manage LSP servers, linters, and formatters.
    -- https://github.com/williamboman/mason.nvim
    {
      "williamboman/mason.nvim",
    },
    -- Extension to mason.nvim that makes it easier to use lspconfig with mason.nvim.
    -- https://github.com/williamboman/mason-lspconfig.nvim
    {
      "williamboman/mason-lspconfig.nvim",
    },
    -- Faster Lua development with library and Neovim API completions
    {
      "folke/lazydev.nvim",
      ft = "lua", -- only load on lua files
      opts = {
        library = {
          -- See the configuration section for more details
          -- Load luvit types when the `vim.uv` word is found
          { path = "${3rd}/luv/library", words = { "vim%.uv" } },
        },
      },
    },
}
