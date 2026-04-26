-- A search and replace tool for Neovim.
-- https://github.com/nvim-pack/nvim-spectre
return {
    'nvim-pack/nvim-spectre',
    commit = '72f56f7585903cd7bf92c665351aa585e150af0f', -- Congelat al commit funcional
    dependencies = { 'nvim-lua/plenary.nvim' },
    config = function()
        require("cargolreactiu.after.plugins.nvim_spectre")
    end,
}
