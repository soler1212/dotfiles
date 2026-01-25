-- Ensure leader is set before any mappings/plugins are loaded.
vim.g.mapleader = " "
vim.g.maplocalleader = ","

require("cargolreactiu.options")
require("cargolreactiu.mappings")
require("cargolreactiu.init_lazy")
require("cargolreactiu.after")
