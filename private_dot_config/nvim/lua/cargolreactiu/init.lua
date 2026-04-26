-- Ensure leader is set before any mappings/plugins are loaded.
vim.g.mapleader = " "
vim.g.maplocalleader = ","

-- [[ Neovim 0.12 Compatibility ]]
-- Aquesta crida posa els shims necessaris per connectors externs
require("cargolreactiu.compatibility").setup()

require("cargolreactiu.options")
require("cargolreactiu.mappings")
require("cargolreactiu.init_lazy")
require("cargolreactiu.after")
