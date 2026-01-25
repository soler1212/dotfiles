-- Reserve a space in the gutter
vim.opt.signcolumn = 'yes'

local capabilities = vim.tbl_deep_extend(
  'force',
  vim.lsp.protocol.make_client_capabilities(),
  require('cmp_nvim_lsp').default_capabilities()
)

-- Apply defaults for all LSP configs.
vim.lsp.config('*', { capabilities = capabilities })

-- This is where you enable features that only work
-- if there is a language server active in the file
vim.api.nvim_create_autocmd('LspAttach', {
  desc = 'LSP actions',
  callback = function(event)
    local opts = { buffer = event.buf }

    local function lspsaga_cmd(subcmd)
      if vim.fn.exists(':Lspsaga') == 2 then
        local ok = pcall(vim.cmd, 'Lspsaga ' .. subcmd)
        if ok then
          return true
        end
      end
      return false
    end

    vim.keymap.set('n', 'K', function()
      if not lspsaga_cmd('hover_doc') then
        vim.lsp.buf.hover()
      end
    end, vim.tbl_extend('force', opts, { desc = 'Hover (Lspsaga)' }))

    vim.keymap.set('n', 'gd', vim.lsp.buf.definition, vim.tbl_extend('force', opts, { desc = 'LSP definition' }))
    vim.keymap.set('n', 'gD', vim.lsp.buf.declaration, vim.tbl_extend('force', opts, { desc = 'LSP declaration' }))
    vim.keymap.set('n', 'gi', vim.lsp.buf.implementation, vim.tbl_extend('force', opts, { desc = 'LSP implementation' }))
    vim.keymap.set('n', 'go', vim.lsp.buf.type_definition, vim.tbl_extend('force', opts, { desc = 'LSP type definition' }))
    vim.keymap.set('n', 'gr', vim.lsp.buf.references, vim.tbl_extend('force', opts, { desc = 'LSP references' }))
    vim.keymap.set('n', 'gs', vim.lsp.buf.signature_help, vim.tbl_extend('force', opts, { desc = 'LSP signature help' }))
    vim.keymap.set('n', '<F2>', function()
      if not lspsaga_cmd('rename') then
        vim.lsp.buf.rename()
      end
    end, vim.tbl_extend('force', opts, { desc = 'Rename (Lspsaga)' }))
    vim.keymap.set({ 'n', 'x' }, '<F3>', function() vim.lsp.buf.format({ async = true }) end,
      vim.tbl_extend('force', opts, { desc = 'LSP format' }))
    vim.keymap.set('n', '<F4>', function()
      if not lspsaga_cmd('code_action') then
        vim.lsp.buf.code_action()
      end
    end, vim.tbl_extend('force', opts, { desc = 'Code action (Lspsaga)' }))
  end,
})

local ts_root_markers = { 'tsconfig.json', 'jsconfig.json', 'package.json', '.git' }

local function resolve_ts_root(startpath)
  local roots = vim.fs.find(ts_root_markers, { upward = true, path = startpath, limit = 1 })
  return roots[1] and vim.fs.dirname(roots[1]) or startpath
end

-- Neovim 0.11+ form: must call `on_dir(root_dir)` to activate LSP.
local function ts_root_dir(bufnr, on_dir)
  local fname = vim.api.nvim_buf_get_name(bufnr)
  if fname == '' then
    on_dir((vim.uv or vim.loop).cwd())
    return
  end

  local startpath = vim.fs.dirname(vim.fn.fnamemodify(fname, ':p'))
  on_dir(resolve_ts_root(startpath))
end

-- Alternative install method
-- There is a way to install some language servers from inside Neovim. This requires two extra plugins and learning how to use them together with lspconfig. The details are in this guide: Integrate with mason.nvim.

-- Minimal autocompletion config
--
--
local cmp = require('cmp')

cmp.setup({
  enabled = function()
    return vim.g.cmp_enabled ~= false
  end,
  window = {
    completion = cmp.config.window.bordered(),
    documentation = cmp.config.window.bordered(),
  },
  sources = {
    { name = 'nvim_lsp' },
    { name = 'path' },
    { name = 'buffer' },
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
  'cssls', -- LSP for CSS/SCSS/Less
  'lua_ls', -- LSP para Lua
  'pyright', -- LSP para Python
  'ts_ls', -- LSP para TypeScript
}

vim.lsp.config('ts_ls', { root_dir = ts_root_dir })

-- Installed outside Mason.
vim.lsp.config('anakin_language_server', {}) -- Per python estic fent tests
vim.lsp.enable('anakin_language_server')

require('mason').setup({})
require('mason-lspconfig').setup({
  ensure_installed = mason_servers,
  automatic_enable = mason_servers,
})
