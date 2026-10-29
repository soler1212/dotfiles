local parsers = {
  "javascript",
  "typescript",
  "python",
  "lua",
  "vim",
  "vimdoc",
  "query",
  "markdown",
  "markdown_inline",
}

require("nvim-treesitter").setup({})
require("nvim-treesitter").install(parsers)

-- Use native Treesitter highlighting and folding when a parser is installed.
vim.api.nvim_create_autocmd('FileType', {
  desc = 'Start Treesitter for supported filetypes',
  callback = function(args)
    local max_filesize = vim.g.big_file.size or (100 * 1024)
    local ok, stats = pcall(vim.uv.fs_stat, vim.api.nvim_buf_get_name(args.buf))
    if ok and stats and stats.size > max_filesize then
      return
    end

    if pcall(vim.treesitter.start, args.buf) then
      vim.wo.foldmethod = 'expr'
      vim.wo.foldexpr = 'v:lua.vim.treesitter.foldexpr()'
      vim.bo[args.buf].indentexpr = "v:lua.require'nvim-treesitter'.indentexpr()"
    end
  end,
})
