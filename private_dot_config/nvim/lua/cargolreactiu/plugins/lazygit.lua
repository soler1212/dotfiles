-- Plugin for calling lazygit from within neovim.
-- https://github.com/kdheepak/lazygit.nvim
return {
    "kdheepak/lazygit.nvim",
    commit = "a04ad0dbc725134edbee3a5eea29290976695357", -- Congelat al commit funcional
    -- optional for floating window border decoration
    dependencies = {
        "nvim-lua/plenary.nvim",
    },
}
