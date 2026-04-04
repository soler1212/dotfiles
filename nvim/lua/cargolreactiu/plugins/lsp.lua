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
    -- Portable package manager for Neovim.
    {
      "williamboman/mason.nvim",
      tag = "v1.10.0", -- Congelat a la versió estable
    },
    -- Extension to mason.nvim.
    {
      "williamboman/mason-lspconfig.nvim",
      tag = "v1.31.0", -- Congelat a la versió estable
    },
    -- Faster Lua development with library and Neovim API completions
    {
      "folke/lazydev.nvim",
      ft = "lua",
      tag = "v1.10.0", -- Congelat
      opts = {
        library = {
          { path = "${3rd}/luv/library", words = { "vim%.uv" } },
        },
      },
    },
}
