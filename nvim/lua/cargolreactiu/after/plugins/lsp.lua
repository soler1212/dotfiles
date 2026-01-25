-- Reserve a space in the gutter
vim.opt.signcolumn = 'yes'

-- In Neovim 0.11+, `vim.lsp.config` is a callable table (supports both
-- `vim.lsp.config('pyright', {...})` and `vim.lsp.config['pyright']`).
local has_vim_lsp_config = (type(vim.lsp.config) == 'table' or type(vim.lsp.config) == 'function')
  and type(vim.lsp.enable) == 'function'

local capabilities = vim.tbl_deep_extend(
  'force',
  vim.lsp.protocol.make_client_capabilities(),
  require('cmp_nvim_lsp').default_capabilities()
)

-- This is where you enable features that only work
-- if there is a language server active in the file
vim.api.nvim_create_autocmd('LspAttach', {
  desc = 'LSP actions',
  callback = function(event)
    local opts = {buffer = event.buf}

    vim.keymap.set('n', 'K', '<cmd>lua vim.lsp.buf.hover()<cr>', opts)
    vim.keymap.set('n', 'gd', '<cmd>lua vim.lsp.buf.definition()<cr>', opts)
    vim.keymap.set('n', 'gD', '<cmd>lua vim.lsp.buf.declaration()<cr>', opts)
    vim.keymap.set('n', 'gi', '<cmd>lua vim.lsp.buf.implementation()<cr>', opts)
    vim.keymap.set('n', 'go', '<cmd>lua vim.lsp.buf.type_definition()<cr>', opts)
    vim.keymap.set('n', 'gr', '<cmd>lua vim.lsp.buf.references()<cr>', opts)
    vim.keymap.set('n', 'gs', '<cmd>lua vim.lsp.buf.signature_help()<cr>', opts)
    vim.keymap.set('n', '<F2>', '<cmd>lua vim.lsp.buf.rename()<cr>', opts)
    vim.keymap.set({'n', 'x'}, '<F3>', '<cmd>lua vim.lsp.buf.format({async = true})<cr>', opts)
    vim.keymap.set('n', '<F4>', '<cmd>lua vim.lsp.buf.code_action()<cr>', opts)
  end,
})

local function ts_root_dir(fname)
  local startpath = vim.fs.dirname(vim.fn.fnamemodify(fname, ':p'))
  local roots = vim.fs.find(
    { 'tsconfig.json', 'jsconfig.json', 'package.json', '.git' },
    { upward = true, path = startpath, limit = 1 }
  )
  return roots[1] and vim.fs.dirname(roots[1]) or startpath
end

-- Alternative install method
-- There is a way to install some language servers from inside Neovim. This requires two extra plugins and learning how to use them together with lspconfig. The details are in this guide: Integrate with mason.nvim.

-- Minimal autocompletion config
--
--
local cmp = require('cmp')

cmp.setup({
  sources = {
    {name = 'nvim_lsp'},
  },
  snippet = {
    expand = function(args)
      -- You need Neovim v0.10 to use vim.snippet
      vim.snippet.expand(args.body)
    end,
  },
  mapping = cmp.mapping.preset.insert({
    -- open the completion menu
    ['<C-Space>'] = cmp.mapping.complete(),
    -- confirm completion
    ['<CR>'] = cmp.mapping.confirm({select = true}),
    -- navigate to the next item
    ['<Tab>'] = function(fallback)
      if cmp.visible() then
        cmp.select_next_item()
      else
        fallback()
      end
    end,
    -- navigate to the previous item
    ['<S-Tab>'] = function(fallback)
      if cmp.visible() then
        cmp.select_prev_item()
      else
        fallback()
      end
    end,
  }),
})


-- INFO: A partir d'aqui instala els ajudants per instalar automaticament els LSP mes info https://lsp-zero.netlify.app/docs/language-server-configuration.html#automatic-installs
local mason_servers = {
  'eslint', -- LSP para ESLint (JavaScript, TypeScript)
  'lua_ls', -- LSP para Lua
  'pyright', -- LSP para Python
  'ts_ls', -- LSP para TypeScript
}

if has_vim_lsp_config then
  vim.lsp.config('lua_ls', { capabilities = capabilities })
  vim.lsp.config('eslint', { capabilities = capabilities }) -- Per typescript estic fent tests
  vim.lsp.config('pyright', { capabilities = capabilities })
  vim.lsp.config('ts_ls', { capabilities = capabilities, root_dir = ts_root_dir })

  -- Installed outside Mason.
  vim.lsp.config('anakin_language_server', { capabilities = capabilities }) -- Per python estic fent tests

  require('mason').setup({})
  require('mason-lspconfig').setup({
    ensure_installed = mason_servers,
    automatic_enable = mason_servers,
  })

  vim.lsp.enable('anakin_language_server')
else
  -- Fallback for older Nvim versions (pre-0.11).
  require('mason').setup({})

  local ok, mason_lspconfig = pcall(require, 'mason-lspconfig')
  if ok then
    mason_lspconfig.setup({ ensure_installed = mason_servers })
  end

  require('lspconfig').lua_ls.setup({ capabilities = capabilities })
  require('lspconfig').eslint.setup({ capabilities = capabilities })
  require('lspconfig').pyright.setup({ capabilities = capabilities })
  require('lspconfig').ts_ls.setup({ capabilities = capabilities, root_dir = ts_root_dir })
  require('lspconfig').anakin_language_server.setup({ capabilities = capabilities })
end
