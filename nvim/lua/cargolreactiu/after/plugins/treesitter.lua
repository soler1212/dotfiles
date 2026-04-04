require('nvim-treesitter.configs').setup({
  -- A list of parser names, or "all"
  ensure_installed = {
    "javascript",
    "typescript",
    "python",
    "lua",
    "vim",
    "vimdoc",
    "query",
    "markdown",
    "markdown_inline"
  },

  -- Install parsers synchronously (only applied to `ensure_installed`)
  sync_install = false,

  -- Automatically install missing parsers when entering buffer
  auto_install = true,

  highlight = {
    enable = true,
    -- Custom disable for big files
    disable = function(lang, buf)
      local max_filesize = vim.g.big_file.size or (100 * 1024) -- default 100 KB
      local ok, stats = pcall(vim.uv.fs_stat, vim.api.nvim_buf_get_name(buf))
      if ok and stats and stats.size > max_filesize then
        return true
      end
    end,
  },

  indent = {
    enable = true,
  },
})

-- Treesitter-based folding
-- We keep this autocommand because foldmethod = 'expr' needs to be set per buffer.
vim.api.nvim_create_autocmd('FileType', {
  desc = 'Enable Treesitter Folding',
  callback = function(args)
    -- Check for big file
    local max_filesize = vim.g.big_file.size or (100 * 1024)
    local ok, stats = pcall(vim.uv.fs_stat, vim.api.nvim_buf_get_name(args.buf))
    if ok and stats and stats.size > max_filesize then return end

    if pcall(vim.treesitter.get_parser, args.buf) then
      vim.wo.foldmethod = 'expr'
      vim.wo.foldexpr = 'v:lua.vim.treesitter.foldexpr()'
    end
  end,
})
