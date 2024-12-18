vim.keymap.set("n", "<leader>C", vim.cmd.BufferClose, { desc = 'buffer Close' })
vim.keymap.set("n", "<leader>br", vim.cmd.BufferRestore, { desc = 'buffer Restore' })
-- Navigation
vim.keymap.set("n", "<Tab>", vim.cmd.BufferNext, { desc = 'buffer next' })
vim.keymap.set("n", "<S-Tab>", vim.cmd.BufferPrevious, { desc = 'buffer previous' })
-- Pin/Unpin
vim.keymap.set("n", "<leader>bp", vim.cmd.BufferPin, { desc = 'Buffer toggle Pin' })
--FIXME: vim.keymap.set("n", "<leader>bgp", vim.cmd.BufferGotoPinned, { desc = 'Buffer Go to Pinned' })
--FIXME: vim.keymap.set("n", "<leader>bgu", vim.cmd.BufferGotoUnpinned, { desc = 'Buffer Go to Unpinned' })
-- Manualment Order 
vim.keymap.set("n", "<leader>bmp", vim.cmd.BufferMovePrevious, { desc = 'Buffer Move Previous' })
vim.keymap.set("n", "<leader>bmn", vim.cmd.BufferMoveNext, { desc = 'Buffer Move Next' })
-- Automatic Order By
vim.keymap.set("n", "<leader>bon", vim.cmd.BufferOrderByName, { desc = 'Buffer Order by Name' })
vim.keymap.set("n", "<leader>bod", vim.cmd.BufferOrderByDirectory, { desc = 'Buffer Order by Directory' })
vim.keymap.set("n", "<leader>bol", vim.cmd.BufferOrderByLanguage, { desc = 'Buffer Order by Language' })
vim.keymap.set("n", "<leader>bow", vim.cmd.BufferOrderByWindowNumber, { desc = 'Buffer Order by Window number' })
vim.keymap.set("n", "<leader>bob", vim.cmd.BufferOrderByBufferNumber, { desc = 'Buffer Order by Buffer number' })
