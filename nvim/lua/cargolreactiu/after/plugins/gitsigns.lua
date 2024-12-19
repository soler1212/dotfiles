require('gitsigns').setup {
  on_attach = function(bufnr)
    local gitsigns = require('gitsigns')

    local function map(mode, l, r, opts)
      opts = opts or {}
      opts.buffer = bufnr
      vim.keymap.set(mode, l, r, opts)
    end


    -- Hunk Navigation
    map('n', ']h', function()
      if vim.wo.diff then
        vim.cmd.normal({ ']c', bang = true })
      else
        gitsigns.nav_hunk('next')
      end
    end, { desc = "Navigate to next Git hunk" })

    map('n', '[h', function()
      if vim.wo.diff then
        vim.cmd.normal({ '[c', bang = true })
      else
        gitsigns.nav_hunk('prev')
      end
    end, { desc = "Navigate to previous Git hunk" })

    -- Hunk Actions
    map('n', '<leader>gs', gitsigns.stage_hunk, { desc = "Stage current hunk" })
    map('n', '<leader>gr', gitsigns.reset_hunk, { desc = "Reset current hunk" })

    map('v', '<leader>gs', function()
      gitsigns.stage_hunk { vim.fn.line('.'), vim.fn.line('v') }
    end, { desc = "Stage selected lines as hunk" })

    map('v', '<leader>gr', function()
      gitsigns.reset_hunk { vim.fn.line('.'), vim.fn.line('v') }
    end, { desc = "Reset selected lines as hunk" })

    -- Buffer Actions
    map('n', '<leader>gS', gitsigns.stage_buffer, { desc = "Stage all changes in buffer" })
    map('n', '<leader>gu', gitsigns.undo_stage_hunk, { desc = "Undo last staged hunk" })
    map('n', '<leader>gR', gitsigns.reset_buffer, { desc = "Reset all changes in buffer" })

    -- Hunk Info
    map('n', '<leader>gp', gitsigns.preview_hunk, { desc = "Preview current hunk" })
    map('n', '<leader>gb', function()
      gitsigns.blame_line { full = true }
    end, { desc = "Show detailed blame for current line" })
    map('n', '<leader>gd', gitsigns.diffthis, { desc = "Show diff against index" })
    map('n', '<leader>gD', function()
      gitsigns.diffthis('~')
    end, { desc = "Show diff against previous commit" })

    -- Toggles
    map('n', '<leader>gtl', gitsigns.toggle_current_line_blame, { desc = "Toggle inline blame annotations" })
    map('n', '<leader>gtx', gitsigns.toggle_deleted, { desc = "Toggle display of deleted lines" })

    -- Text Objects
    map({ 'o', 'x' }, 'ih', ':<C-U>Gitsigns select_hunk<CR>', { desc = "Select Git hunk" })
  end
}
