local builtin = require('neo-tree')

vim.keymap.set('n', '<leader>e', "<cmd>Neotree toggle<cr>", { desc = 'Neotree' })

vim.fn.sign_define("DiagnosticSignError", { text = " ", texthl = "DiagnosticSignError" })
vim.fn.sign_define("DiagnosticSignWarn", { text = " ", texthl = "DiagnosticSignWarn" })
vim.fn.sign_define("DiagnosticSignInfo", { text = " ", texthl = "DiagnosticSignInfo" })
vim.fn.sign_define("DiagnosticSignHint", { text = "󰌵", texthl = "DiagnosticSignHint" })

builtin.setup({
  auto_clean_after_session_restore = true,
  close_if_last_window = false,
  buffers = {
    show_unloaded = true
  },
  sources = { "filesystem", "buffers", "git_status" },
  source_selector = {
    winbar = true,
    content_layout = "center",
    sources = {
      { source = "filesystem", },
      { source = "buffers", },
      { source = "git_status", },
      { source = "diagnostics", },
    },
  },
  default_component_configs = {
    indent = { padding = 0 },
    icon = {
      folder_closed = "",
      folder_open = "",
      folder_empty = "",
      default = "",
    },
    modified = { symbol = "" },
    git_status = {
      symbols = {
        added = "",
        deleted = "",
        modified = "",
        renamed = "➜",
        untracked = "★",
        ignored = "◌",
        unstaged = "✓",
        staged = "✓",
        conflict = "",
      },
    },
  },
  -- A command is a function that we can assign to a mapping (below)
  commands = {
    system_open = function(state)
      require("base.utils").open_with_program(state.tree:get_node():get_id())
    end,
    parent_or_close = function(state)
      local node = state.tree:get_node()
      if
          (node.type == "directory" or node:has_children())
          and node:is_expanded()
      then
        state.commands.toggle_node(state)
      else
        require("neo-tree.ui.renderer").focus_node(
          state,
          node:get_parent_id()
        )
      end
    end,
    child_or_open = function(state)
      local node = state.tree:get_node()
      if node.type == "directory" or node:has_children() then
        if not node:is_expanded() then       -- if unexpanded, expand
          state.commands.toggle_node(state)
        else                                 -- if expanded and has children, seleect the next child
          require("neo-tree.ui.renderer").focus_node(
            state,
            node:get_child_ids()[1]
          )
        end
      else       -- if not a directory just open it
        state.commands.open(state)
      end
    end,
    copy_selector = function(state)
      local node = state.tree:get_node()
      local filepath = node:get_id()
      local filename = node.name
      local modify = vim.fn.fnamemodify

      local results = {
        e = { val = modify(filename, ":e"), msg = "Extension only" },
        f = { val = filename, msg = "Filename" },
        F = {
          val = modify(filename, ":r"),
          msg = "Filename w/o extension",
        },
        h = {
          val = modify(filepath, ":~"),
          msg = "Path relative to Home",
        },
        p = {
          val = modify(filepath, ":."),
          msg = "Path relative to CWD",
        },
        P = { val = filepath, msg = "Absolute path" },
      }

      local messages = {
        { "\nChoose to copy to clipboard:\n", "Normal" },
      }
      for i, result in pairs(results) do
        if result.val and result.val ~= "" then
          vim.list_extend(messages, {
            { ("%s."):format(i),           "Identifier" },
            { (" %s: "):format(result.msg) },
            { result.val,                  "String" },
            { "\n" },
          })
        end
      end
      vim.api.nvim_echo(messages, false, {})
      local result = results[vim.fn.getcharstr()]
      if result and result.val and result.val ~= "" then
        vim.notify("Copied: " .. result.val)
        vim.fn.setreg("+", result.val)
      end
    end,
    find_in_dir = function(state)
      local node = state.tree:get_node()
      local path = node:get_id()
      require("telescope.builtin").find_files {
        cwd = node.type == "directory" and path
            or vim.fn.fnamemodify(path, ":h"),
      }
    end,
  },
  window = {
    position = "right",
    width = 30,
    mappings = {
      ["<space>"] = false,
      -- ["<S-CR>"] = "system_open",
      -- ["[b"] = "prev_source",
      -- ["]b"] = "next_source",
      -- F = utils.is_available "telescope.nvim" and "find_in_dir" or nil,
      -- O = "system_open",
      -- Y = "copy_selector",
      -- h = "parent_or_close",
      -- l = "child_or_open",
    },
  },
  filesystem = {
    follow_current_file = {
      enabled = true,
    },
    hijack_netrw_behavior = "open_current",
    use_libuv_file_watcher = true,
  },
  event_handlers = {
    {
      event = "neo_tree_buffer_enter",
      handler = function(_) vim.opt_local.signcolumn = "auto" end,
    },
  },
})
