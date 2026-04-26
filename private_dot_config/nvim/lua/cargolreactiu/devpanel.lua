local M = {}

local function has_cmd(cmd)
  return vim.fn.exists(':' .. cmd) == 2
end

local function cmd(command_line)
  local ok, err = pcall(vim.cmd, command_line)
  if not ok then
    vim.notify(err, vim.log.levels.WARN)
  end
end

local function safe_require(name)
  local ok, mod = pcall(require, name)
  if ok then
    return mod
  end
  return nil
end

local function lsp_attached()
  return #vim.lsp.get_clients({ bufnr = 0 }) > 0
end

local function lsp_hover()
  if has_cmd('Lspsaga') then
    local ok = pcall(vim.cmd, 'Lspsaga hover_doc')
    if ok then
      return
    end
  end
  vim.lsp.buf.hover()
end

local function lsp_rename()
  if has_cmd('Lspsaga') then
    local ok = pcall(vim.cmd, 'Lspsaga rename')
    if ok then
      return
    end
  end
  vim.lsp.buf.rename()
end

local function lsp_code_action()
  if has_cmd('Lspsaga') then
    local ok = pcall(vim.cmd, 'Lspsaga code_action')
    if ok then
      return
    end
  end
  vim.lsp.buf.code_action()
end

local function telescope(builtin_name, opts)
  local builtin = safe_require('telescope.builtin')
  if not builtin or not builtin[builtin_name] then
    vim.notify('telescope not available: ' .. builtin_name, vim.log.levels.WARN)
    return
  end
  builtin[builtin_name](opts or {})
end

local function trouble(command_line)
  if not has_cmd('Trouble') then
    vim.notify('Trouble not available', vim.log.levels.WARN)
    return
  end
  cmd(command_line)
end

local function choose(title, items)
  vim.ui.select(items, {
    prompt = title,
    format_item = function(item)
      return item.label
    end,
  }, function(item)
    if not item then
      return
    end
    item.action()
  end)
end

function M.open()
  local root = {
    {
      label = 'LSP',
      action = function()
        if not lsp_attached() then
          vim.notify('No LSP attached to this buffer', vim.log.levels.INFO)
        end
        choose('LSP', {
          { label = 'Hover docs (Saga)', action = lsp_hover },
          { label = 'Signature help', action = vim.lsp.buf.signature_help },
          { label = 'Rename (Saga)', action = lsp_rename },
          { label = 'Code action (Saga)', action = lsp_code_action },
          { label = 'Format buffer', action = function() vim.lsp.buf.format({ async = true }) end },
          { label = 'References (Telescope)', action = function() telescope('lsp_references') end },
          { label = 'Definitions (Telescope)', action = function() telescope('lsp_definitions') end },
          { label = 'Workspace symbols (Telescope)', action = function() telescope('lsp_workspace_symbols') end },
          { label = 'LspInfo', action = function() cmd('LspInfo') end },
          { label = 'LspRestart', action = function() cmd('LspRestart') end },
          { label = 'Checkhealth vim.lsp', action = function() cmd('checkhealth vim.lsp') end },
        })
      end,
    },
    {
      label = 'Diagnostics',
      action = function()
        choose('Diagnostics', {
          { label = 'Trouble: workspace diagnostics', action = function() trouble('Trouble diagnostics toggle') end },
          {
            label = 'Trouble: buffer diagnostics',
            action = function() trouble('Trouble diagnostics toggle filter.buf=0') end,
          },
          { label = 'Trouble: symbols', action = function() trouble('Trouble symbols toggle focus=false') end },
          {
            label = 'Trouble: LSP list (defs/refs/...)',
            action = function() trouble('Trouble lsp toggle focus=false win.position=right') end,
          },
          { label = 'Trouble: quickfix', action = function() trouble('Trouble qflist toggle') end },
          { label = 'Trouble: loclist', action = function() trouble('Trouble loclist toggle') end },
          {
            label = 'Diagnostics: line float',
            action = function() vim.diagnostic.open_float(nil, { focus = false }) end,
          },
          { label = 'Diagnostics: prev', action = vim.diagnostic.goto_prev },
          { label = 'Diagnostics: next', action = vim.diagnostic.goto_next },
          { label = 'Diagnostics (Telescope)', action = function() telescope('diagnostics') end },
        })
      end,
    },
    {
      label = 'Tools',
      action = function()
        choose('Tools', {
          { label = 'Mason', action = function() cmd('Mason') end },
          { label = 'Lazy', action = function() cmd('Lazy') end },
          { label = 'Telescope: keymaps', action = function() telescope('keymaps') end },
          { label = 'Telescope: commands', action = function() telescope('commands') end },
        })
      end,
    },
  }

  choose('Dev Panel (<leader>l)', root)
end

return M
