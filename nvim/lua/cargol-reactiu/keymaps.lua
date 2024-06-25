local kind = require('cargol-reactiu.kind')

lvim.leader = "space"

-- Do not yank with x
vim.keymap.set("n", "x", '"_x')
-- Select all
vim.keymap.set("n", "<C-a>", "gg<S-v>G")

-- Guardar file
lvim.keys.normal_mode["<C-s>"] = ":w<cr>"
-- Moviment del buffer
lvim.keys.normal_mode["<Tab>"] = ":BufferLineCycleNext<CR>"
lvim.keys.normal_mode["<S-Tab>"] = ":BufferLineCyclePrev<CR>"
-- Crear tab Moviment del tabs amb gt
vim.keymap.set('n', 'gn', ":tabe %<CR>")

-- Per trobar referencies(Tots els llocs on s'esta usant X cosa)
lvim.lsp.buffer_mappings.normal_mode["gr"] = {
  ":lua require'telescope.builtin'.lsp_references()<cr>",
  kind.cmp_kind.Reference .. " Find references",
}
-- Per veure les definicions(On esta declarada la cosa X) esta commentat perque ara ho faig em el Lspsaga
-- TODO: per algun motiu no es mostra en el telescope
-- lvim.lsp.buffer_mappings.normal_mode["gd"] = {
--   -- ":lua vim.lsp.buf.definition()<cr>",
--   ":lua require'telescope.builtin'.lsp_definitions()<cr>",
--   kind.cmp_kind.Reference .. " Definitions"
-- }
-- TODO: No entenc la diferencia amb el de sobra
-- lvim.lsp.buffer_mappings.normal_mode["gD"] = {
--   ":lua vim.lsp.buf.type_definition()<cr>",
--   kind.cmp_kind.Reference .. " Type Definition"
-- }
-- Per obrir els files que es has obert en mes frequencia
lvim.lsp.buffer_mappings.normal_mode["ff"] = {
  ":Telescope frecency<cr>", kind.cmp_kind.Reference .. " Telescope Frecency"
}
-- Buscador de files per nom en el projecte
vim.keymap.set('n', '<C-p>', ":lua require'telescope.builtin'.find_files()<cr>", {})
-- Seleccionador de buffers
vim.keymap.set('n', '<C-b>', ":lua require'telescope.builtin'.buffers()<cr>", {})
-- Busca string a dins el buffer
vim.keymap.set(
  'n',
  '<C-f>',
  ":lua require'telescope.builtin'.live_grep({search_dirs = {vim.api.nvim_buf_get_name(0)}})<cr>",
  {}
)
-- Busca string a dins els files del projecte
vim.keymap.set('n', '<C-A-f>', ":lua require'telescope.builtin'.live_grep()<cr>")

-- LSPsaga keysbinding
local opts = { noremap = true, silent = true }
vim.keymap.set("n", "<C-j>", "<Cmd>Lspsaga diagnostic_jump_next<cr>", opts);
vim.keymap.set("n", "<C-A-j>", "<Cmd>Lspsaga diagnostic_jump_prev<cr>", opts);
vim.keymap.set("n", "<C-h>", "<Cmd>Lspsaga code_action<cr>", opts);
vim.keymap.set("n", "<K>", "<Cmd>Lspsaga hover_doc<cr>", opts);
lvim.lsp.buffer_mappings.normal_mode["gf"] = { ":Lspsaga finder<CR>", "Go to Definitions meu" }
lvim.lsp.buffer_mappings.normal_mode["gd"] = { ":Lspsaga peek_definition<CR>", "Go to Definitions meu" }
vim.keymap.set("n", "<A-u>", "<Cmd>Lspsaga peek_definition<cr>", opts);


-- Spectre
vim.keymap.set("n", "<C-A-r>", "<Cmd>Spectre<cr>", opts);
vim.keymap.set("v", "<C-A-r>", ":lua require('spectre').open_visual()<cr>", opts);
vim.keymap.set("n", "<A-r>", ":lua require('spectre').open_file_search({select_word=true})<cr>", opts);
vim.keymap.set("v", "<A-r>", ":lua require('spectre').open_file_search({select_word=true})<cr>", opts);


