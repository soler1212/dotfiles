---- Followed this instructions https://lsp-zero.netlify.app/docs/getting-started.html
return {
    -- Quickstart configs for Nvim LSP
    -- https://github.com/neovim/nvim-lspconfig
    {
      "neovim/nvim-lspconfig",
    },
    -- nvim-cmp source for neovim builtin LSP client
    -- https://github.com/hrsh7th/cmp-nvim-lsp
    {
      "hrsh7th/cmp-nvim-lsp",
    },
    -- A completion plugin for neovim coded in Lua.
    -- https://github.com/hrsh7th/nvim-cmp
    {
      "hrsh7th/nvim-cmp",
    },
    -- INFO: A partir d'aqui instala els ajudants per instalar automaticament els LSP mes info https://lsp-zero.netlify.app/docs/language-server-configuration.html#automatic-installs
    -- Portable package manager for Neovim that runs everywhere Neovim runs. Easily install and manage LSP servers, DAP servers, linters, and formatters.
    -- https://github.com/williamboman/mason.nvim
    {
      "williamboman/mason.nvim",
    },
    -- Extension to mason.nvim that makes it easier to use lspconfig with mason.nvim.
    -- https://github.com/williamboman/mason-lspconfig.nvim
    {
      "williamboman/mason-lspconfig.nvim",
    }
}
