local wk = require("which-key")

local opts = {
  preset = "classic", -- "classic", "modern", or "helix"
  icons = {
    group = vim.g.icons_enabled ~= false and "" or "+",
    separator = "->",
  },
}

-- Define custom keybindings
wk.add({
  { "<leader>a", "<cmd>Alpha<CR>", desc = "Dashboard" },

  { "<leader>p", group = "🧰 [P]alette Commands" },
  { "<leader>ps", group = "Grep [S]earch File" },
  -- File keymaps
  { "<leader>f", group = "📁 Manage [F]iles" },
  { "<leader>fo", group = "🔄 [O]ther File Actions" },

  -- Buffer keymaps
  { "<leader>b", group = "📑 Manage [B]uffers" },
  { "<leader>bc", group = "❌ [C]lose Buffers" },
  { "<leader>bg", group = "🔍 [G]o to Buffers" },
  { "<leader>bm", group = "↕️ [M]ove Buffers" },
  { "<leader>bo", group = "📊 [O]rder Buffers" },

  -- Session keymaps
  { "<leader>s", group = "💾 [S]ession Management" },
  { "<leader>sd", group = "🗑️ [D]elete Sessions" },

  -- Git keymaps
  { "<leader>g", group = "⚙️ [G]it Manage" },
  { "<leader>gg", desc = "🚀 [G]it TUI (LazyGit)" },
  { "<leader>gt", group = "⚙️ [T]oggle Git Features" },
  { "<leader>gs", desc = "✅ [S]tage current hunk" },
  { "<leader>gr", desc = "↩️ [R]eset current hunk" },
  { "<leader>gS", desc = "📦 [S]tage all changes in buffer" },
  { "<leader>gu", desc = "⏪ [U]ndo last staged hunk" },
  { "<leader>gR", desc = "🔄 [R]eset all changes in buffer" },
  { "<leader>gp", desc = "👁️ [P]review current hunk" },
  { "<leader>gb", desc = "🔍 Show [B]lame for current line" },
  { "<leader>gd", desc = "📊 Show [D]iff against index" },
  { "<leader>gD", desc = "📜 Show [D]iff against previous commit" },
  { "<leader>gtl", desc = "🏷️ Toggle [L]ine blame annotations" },
  { "<leader>gtx", desc = "🗑️ Toggle deleted te[X]t" },

  -- AI Interfaces (Leader + i)
  { "<leader>i", group = "🧠 [I]ntelligence / AI" },
  { "<leader>ic", desc = "🚀 [C]odex CLI" },
  { "<leader>ig", desc = "♊ [G]emini CLI" },
  { "<leader>ia", desc = "🤖 [A]I Claude CLI" },


  -- Mark keymaps
  { "<leader>m", group = "🔖 [M]ark Management" },
  { "<leader>mm", desc = "📌 [M]ark Toggle" },
  { "<leader>mc", desc = "🧹 [C]lear all marks in buffer" },
  { "<leader>mp", desc = "👁️ [P]review mark content" },
  { "<leader>md", desc = "🗑️ [D]elete a letter mark" },
  { "<leader>ms", desc = "✏️ [S]et a letter mark" },
  { "<leader>ml", group = "📋 [L]ist Marks" },
  { "<leader>mt", desc = "📝 [T]odo Comments" },
  { "<leader>mlb", desc = "📑 List [B]uffer marks" },
  { "<leader>mla", desc = "🌐 List [A]ll marks" },

  -- Tabs keymaps
  { "<leader>t", group = "📑 [T]ab Management" },

  -- Dev panel (Leader + l)
  { "<leader>l", group = "🧰 [L] Dev Panel" },
  { "<leader>ll", desc = "Open Dev panel" },
  { "<leader>lm", desc = "Mason" },
  { "<leader>li", desc = "LspInfo" },
  { "<leader>lR", desc = "LspRestart" },

  { "<leader>ls", group = "💡 LSP [S]aga" },
  { "<leader>lt", group = "⚠️ LSP [T]rouble" },

  { "<leader>ld", group = "🩺 [D]iagnostics" },
  { "<leader>ldd", desc = "Diagnostics float" },
  { "<leader>ldp", desc = "Diagnostics prev" },
  { "<leader>ldn", desc = "Diagnostics next" },
  { "<leader>ldq", desc = "Diagnostics quickfix" },
  { "<leader>ldl", desc = "Diagnostics loclist" },

  -- Custom
  {
    mode = { "n", "v" },                           -- NORMAL and VISUAL mode
    { "<leader>q", "<cmd>qa<cr>", desc = "Quit" }, -- no need to specify mode since it's inherited
  },
})

wk.setup(opts)
