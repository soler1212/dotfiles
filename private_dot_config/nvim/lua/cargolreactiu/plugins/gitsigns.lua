-- Super fast git decorations implemented purely in Lua.
-- https://github.com/lewis6991/gitsigns.nvim
return {
    'lewis6991/gitsigns.nvim',
    tag = 'v0.9.0', -- Congelat a la versió estable
    config = function()
        require("cargolreactiu.after.plugins.gitsigns")
    end,
}
