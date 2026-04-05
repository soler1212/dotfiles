import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { createPoll } from "ags/time"
import { Accessor, With, For, createComputed, createBinding } from "ags"
import GLib from "gi://GLib"
import AstalBattery from "gi://AstalBattery"
import AstalPowerProfiles from "gi://AstalPowerProfiles"
import AstalWp from "gi://AstalWp"
import AstalNetwork from "gi://AstalNetwork"
import AstalTray from "gi://AstalTray"
import AstalMpris from "gi://AstalMpris"
import AstalApps from "gi://AstalApps"
import { useNetwork } from "../hooks/useNetwork"
import { NetworkAccessPointListItem } from "./components/network-access-points-list-item"
import { CurrentNetworkInfo } from "./components/current-network-info"
import { IPsInfo } from "./components/ips-info"
import { themeService } from "../ThemeService"
import { themes } from "../themes"
import { createState } from "ags"

const themesState = createState(themes)[0]

function ThemeSwitcher() {
  return (
    <menubutton class="theme-switcher">
      <image iconName="preferences-desktop-theme-symbolic" />
      <popover class="network-popover">
        <box orientation={Gtk.Orientation.VERTICAL} spacing={8}>
          <label class="section-title" label="Themes" />
          <For each={themesState}>
            {(theme) => (
              <button
                class="network-access-points-list-item"
                onClicked={() => themeService.setTheme(theme.name)}
              >
                <box spacing={8}>
                  <label label={theme.name} hexpand halign={Gtk.Align.START} />
                  <image
                    iconName="object-select-symbolic"
                    visible={themeService.currentTheme.as((t) => t.name === theme.name)}
                  />
                </box>
              </button>
            )}
          </For>
        </box>
      </popover>
    </menubutton>
  )
}

// Workspaces for Sway
function Workspaces() {
  const workspaces = createPoll([], 1000, "swaymsg -r -t get_workspaces", (out) => {
    try {
      const jsonStart = out.indexOf("[")
      if (jsonStart !== -1) {
        const res = JSON.parse(out.substring(jsonStart))
        return res.sort((a: any, b: any) => a.name.localeCompare(b.name, undefined, { numeric: true }))
      }
    } catch (e) {
      // JSON failed, continue to regex fallback
    }

    // Fallback to regex parsing for pretty-print text
    const res: any[] = []
    const lines = out.split("\n")
    for (const line of lines) {
      const match = line.trim().match(/^Workspace\s+(.+?)(?:\s+\(([^)]+)\))?$/)
      if (match) {
        res.push({
          name: match[1],
          focused: (match[2] || "").includes("focused"),
          urgent: (match[2] || "").includes("urgent"),
        })
      }
    }
    return res.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
  })

  const icons: any = {
    urgent: "!",
    focused: "●",
    default: "○",
  }


  return (
    <box class="workspaces" visible>
      <For each={workspaces}>
        {(item, index: Accessor<number>) => (

          <button
            class={item.focused ? "focused" : item.urgent ? "urgent" : ""}
            onClicked={() => execAsync(`swaymsg workspace ${item.name}`)}
          >
            <label label={item.focused ? icons.focused : item.urgent ? icons.urgent : item.name} />
          </button>

        )}
      </For>
    </box>
  )
}

// Active Window for Sway
function ActiveWindow() {
  const windowName = createPoll("", 500, "swaymsg -r -t get_tree", (out) => {
    try {
      const jsonStart = out.indexOf("{")
      if (jsonStart === -1) return ""
      const tree = JSON.parse(out.substring(jsonStart))
      const findFocused = (node: any): any => {
        if (node.focused) return node
        for (const child of node.nodes || []) {
          const res = findFocused(child)
          if (res) return res
        }
        for (const child of node.floating_nodes || []) {
          const res = findFocused(child)
          if (res) return res
        }
        return null
      }
      const focused = findFocused(tree)
      return focused ? focused.name || "" : ""
    } catch (e) {
      return ""
    }
  })

  return (
    <box class="active-window">
      <label label={windowName} />
    </box>
  )
}

// Clock
// function Clock() {
//   const time = createPoll("", 1000, 'date "+%d/%m %H:%M"')
//   return (
//     <box class="clock">
//       <label label={time} />
//     </box>
//   )
// }

// CPU Usage
function CPU() {
  const cpu = createPoll(
    { usage: 0, load: "", cores: [] as number[] },
    2000,
    'bash -c "top -bn1 | grep -E \'%Cpu\\(s\\)|load average\'; top -bn1 -1 | grep \'%Cpu[0-9]\'\"',
    (out) => {
      try {
        const lines = out.split("\n")
        let usage = 0
        const cores: number[] = []
        let load = ""

        for (const line of lines) {
          if (line.includes("load average:")) {
            load = line.split("load average: ")[1] || ""
          } else if (line.includes("%Cpu(s):")) {
            const match = line.match(/([\d.,]+)\s+id/)
            if (match) {
              usage = Math.round(100 - parseFloat(match[1].replace(",", ".")))
            }
          } else if (line.includes("%Cpu")) {
            const matches = line.matchAll(/%?Cpu(\d+)\s*:.*?([\d.,]+)\s+id/g)
            for (const m of matches) {
              const index = parseInt(m[1])
              cores[index] = Math.round(
                100 - parseFloat(m[2].replace(",", ".")),
              )
            }
          }
        }
        return { usage, load, cores }
      } catch (e) {
        console.error("CPU Poll Error:", e)
        return { usage: 0, load: "error", cores: [] }
      }
    },
  )

  return (
    <menubutton class="cpu">
      <box spacing={4}>
        <label label="󰘚" />
        <label label={cpu.as((c) => `${c.usage}%`)} />
      </box>
      <popover class="network-popover">
        <box orientation={Gtk.Orientation.VERTICAL} widthRequest={300}>
          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
            <label class="popup-title" label="CPU Status" halign={Gtk.Align.START} />
            <label class="popup-value-large" label={cpu.as((c) => `${c.usage}% Usage`)} halign={Gtk.Align.START} />
            <label class="popup-label-detail" label={cpu.as((c) => `Load: ${c.load}`)} halign={Gtk.Align.START} />
          </box>

          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section" visible={cpu.as((c) => c.cores.length > 0)}>
            <label class="popup-title" label="Per-Core Usage" halign={Gtk.Align.START} />
            <Gtk.ScrolledWindow heightRequest={180} vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC} class="popup-scroll">
              <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                <For
                  each={cpu.as((c) => {
                    const pairs = []
                    for (let i = 0; i < c.cores.length; i += 2) {
                      pairs.push({
                        c1: { id: i, val: c.cores[i] },
                        c2:
                          c.cores[i + 1] !== undefined
                            ? { id: i + 1, val: c.cores[i + 1] }
                            : null,
                      })
                    }
                    return pairs
                  })}
                >
                  {(pair) => (
                    <box spacing={16} class="popup-data-row">
                      <box spacing={8} hexpand>
                        <label label={`C${pair.c1.id}`} class="popup-data-key" />
                        <label label={`${pair.c1.val}%`} class="popup-data-value" hexpand halign={Gtk.Align.END} />
                      </box>
                      {pair.c2 && (
                        <box spacing={8} hexpand>
                          <label label={`C${pair.c2.id}`} class="popup-data-key" />
                          <label label={`${pair.c2.val}%`} class="popup-data-value" hexpand halign={Gtk.Align.END} />
                        </box>
                      )}
                    </box>
                  )}
                </For>
              </box>
            </Gtk.ScrolledWindow>
          </box>
        </box>
      </popover>
    </menubutton>
  )
}

// Memory Usage
function Memory() {
  const ram = createPoll(
    {
      percent: 0,
      used: 0,
      total: 0,
      free: 0,
      available: 0,
      cache: 0,
      swapTotal: 0,
      swapUsed: 0,
      swapPercent: 0,
    },
    2000,
    "free -m",
    (out) => {
      try {
        const lines = out.split("\n")
        if (lines.length < 2) throw new Error("Unexpected free output")

        const mem = lines[1].trim().split(/\s+/)
        const total = parseInt(mem[1])
        const used = parseInt(mem[2])
        const free = parseInt(mem[3])
        const cache = parseInt(mem[5])
        const available = parseInt(mem[6])
        const percent = total > 0 ? Math.round((used / total) * 100) : 0

        let swapTotal = 0
        let swapUsed = 0
        let swapPercent = 0
        if (lines.length >= 3) {
          const swap = lines[2].trim().split(/\s+/)
          swapTotal = parseInt(swap[1])
          swapUsed = parseInt(swap[2])
          swapPercent =
            swapTotal > 0 ? Math.round((swapUsed / swapTotal) * 100) : 0
        }

        return {
          percent,
          used,
          total,
          free,
          available,
          cache,
          swapTotal,
          swapUsed,
          swapPercent,
        }
      } catch (e) {
        console.error("Memory Poll Error:", e)
        return {
          percent: 0,
          used: 0,
          total: 0,
          free: 0,
          available: 0,
          cache: 0,
          swapTotal: 0,
          swapUsed: 0,
          swapPercent: 0,
        }
      }
    },
  )

  const formatMB = (mb: number) => {
    if (mb >= 1024) return `${(mb / 1024).toFixed(1)}GB`
    return `${mb}MB`
  }

  return (
    <menubutton class="memory">
      <box spacing={4}>
        <label label="󰍛" />
        <label label={ram.as((r) => `${r.percent}%`)} />
      </box>
      <popover class="network-popover">
        <box orientation={Gtk.Orientation.VERTICAL} widthRequest={300}>
          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
            <label class="popup-title" label="Memory Status" halign={Gtk.Align.START} />
            <label class="popup-value-large" label={ram.as((r) => `${r.percent}% RAM Used`)} halign={Gtk.Align.START} />
            <label class="popup-label-detail" label={ram.as((r) => `Used: ${formatMB(r.used)} / Total: ${formatMB(r.total)}`)} halign={Gtk.Align.START} />
          </box>

          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
            <label class="popup-title" label="Breakdown" halign={Gtk.Align.START} />
            <box spacing={16} class="popup-data-row">
              <box orientation={Gtk.Orientation.VERTICAL} hexpand>
                <label label="Available" class="popup-data-key" />
                <label label={ram.as((r) => formatMB(r.available))} class="popup-data-value" />
              </box>
              <box orientation={Gtk.Orientation.VERTICAL} hexpand>
                <label label="Cached" class="popup-data-key" />
                <label label={ram.as((r) => formatMB(r.cache))} class="popup-data-value" />
              </box>
            </box>
          </box>

          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section" visible={ram.as((r) => r.swapTotal > 0)}>
            <label class="popup-title" label="Swap Usage" halign={Gtk.Align.START} />
            <label class="popup-value-large" label={ram.as((r) => `${r.swapPercent}% Used`)} halign={Gtk.Align.START} />
            <label class="popup-label-detail" label={ram.as((r) => `Used: ${formatMB(r.swapUsed)} / Total: ${formatMB(r.swapTotal)}`)} halign={Gtk.Align.START} />
          </box>
        </box>
      </popover>
    </menubutton>
  )
}

function Disk() {
  const disks = createPoll(
    [{ used: "0", total: "0", percent: 0, free: "0", path: "/", filesystem: "" }],
    10000,
    "df -h",
    (out) => {
      try {
        const lines = out.split("\n").slice(1)
        const res = lines
          .map((line) => line.trim().split(/\s+/))
          .filter((parts) => parts.length >= 6 && parts[0].startsWith("/dev/"))
          .map((parts) => ({
            filesystem: parts[0],
            total: parts[1],
            used: parts[2],
            free: parts[3],
            percent: parseInt(parts[4].replace("%", "")),
            path: parts[5],
          }))
          .sort((a, b) => {
            if (a.path === "/") return -1
            if (b.path === "/") return 1
            return a.path.localeCompare(b.path)
          })
        return res.length > 0
          ? res
          : [
              {
                used: "0",
                total: "0",
                percent: 0,
                free: "0",
                path: "/",
                filesystem: "",
              },
            ]
      } catch (e) {
        console.error("Disk Poll Error:", e)
        return [
          {
            used: "0",
            total: "0",
            percent: 0,
            free: "0",
            path: "/",
            filesystem: "",
          },
        ]
      }
    },
  )

  const rootDisk = disks.as((d) => d.find((disk) => disk.path === "/") || d[0])

  return (
    <menubutton class="disk">
      <box spacing={4}>
        <label label="󰋊" />
        <label label={rootDisk.as((d) => `${d.used}/${d.total}`)} />
      </box>
      <popover class="network-popover">
        <box orientation={Gtk.Orientation.VERTICAL} widthRequest={300}>
          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
            <label class="popup-title" label="Disk Status" halign={Gtk.Align.START} />
            <Gtk.ScrolledWindow heightRequest={240} vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC} class="popup-scroll">
              <box orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                <For each={disks}>
                  {(d) => (
                    <box orientation={Gtk.Orientation.VERTICAL} class="popup-data-row">
                      <box spacing={8}>
                        <label class="popup-data-value" label={d.path} halign={Gtk.Align.START} />
                        <label
                          label={`${d.percent}%`}
                          class="popup-data-value"
                          css={d.percent > 90 ? "color: var(--red);" : "color: var(--mauve);"}
                          halign={Gtk.Align.END}
                          hexpand
                        />
                      </box>
                      <label class="popup-data-key" label={`${d.used} of ${d.total} (${d.free} free)`} halign={Gtk.Align.START} />
                      <label label={d.filesystem} css="font-size: 9px; opacity: 0.4;" class="popup-data-key" />
                    </box>
                  )}
                </For>
              </box>
            </Gtk.ScrolledWindow>
          </box>
        </box>
      </popover>
    </menubutton>
  )
}

function Wireless() {
  const { getNetworkBindings, getActiveNetworkData, sortedAccessPoints } = useNetwork();
  const network = AstalNetwork.get_default()
  const wifi = createBinding(network, "wifi")
  const activeNetwork = getActiveNetworkData();
  const { privateIps, publicIp } = getNetworkBindings();



  return (
    <box visible={wifi(Boolean)}>
      <With value={wifi}>
        {(wifi) =>
          wifi && (
            <menubutton>
              <image
                iconName={activeNetwork.as((data) => {
                  // Si està "Buscant..." o error, icona per defecte
                  if (typeof data === "string") return "network-wireless-signal-none-symbolic";

                  // Si tenim dades, traiem el nom de la icona de l'objecte
                  return data.icon.iconName;
                })}

                class={activeNetwork.as((data) => {
                  // Si hi ha error o no tenim dades, sense classe
                  if (typeof data === "string") return "";

                  // Apliquem la classe (posarà "excelent-connection" si estem al 100%)
                  return data.icon.className;
                })}
              />
              <popover class="network-popover">
                <box orientation={Gtk.Orientation.VERTICAL} widthRequest={300}>
                  {/* Status Section */}
                  <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
                    <label class="popup-title" label="Current Network" halign={Gtk.Align.START} />
                    <CurrentNetworkInfo networkData={activeNetwork} />
                    
                    <Gtk.Separator class="module-separator" orientation={Gtk.Orientation.HORIZONTAL} css="margin: 12px 0;" />
                    
                    <label class="popup-title" label="IP Information" halign={Gtk.Align.START} />
                    <IPsInfo
                      privateIps={privateIps}
                      publicIp={publicIp}
                    />
                  </box>

                  {/* AP List Section */}
                  <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
                    <label class="popup-title" label="Available Networks" halign={Gtk.Align.START} />
                    <Gtk.ScrolledWindow heightRequest={200} vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC} class="popup-scroll">
                      <box orientation={Gtk.Orientation.VERTICAL} spacing={2}>
                        <For each={createBinding(wifi, "accessPoints")(sortedAccessPoints)}>
                          {(ap: AstalNetwork.AccessPoint) => (
                            <NetworkAccessPointListItem accessPoint={ap} wifi={wifi} />
                          )}
                        </For>
                      </box>
                    </Gtk.ScrolledWindow>
                  </box>
                </box>
              </popover>

            </menubutton>
          )
        }
      </With>
    </box>
  )
}

function AudioOutput() {
  const wp = AstalWp.get_default()!
  const speaker = wp.defaultSpeaker
  const microphone = wp.defaultMicrophone

  return (
    <menubutton>
      <image iconName={createBinding(speaker, "volumeIcon")} />
      <popover class="network-popover">
        <box orientation={Gtk.Orientation.VERTICAL} widthRequest={320}>
          <Gtk.ScrolledWindow heightRequest={450} vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC} class="popup-scroll">
            <box orientation={Gtk.Orientation.VERTICAL} spacing={16} class="popup-container">
              
              {/* Output Volume */}
              <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
                <label class="popup-title" label="Speaker Volume" halign={Gtk.Align.START} />
                <box spacing={12} class="popup-data-row">
                  <button 
                    onClicked={() => speaker.mute = !speaker.mute}
                    class="popup-list-item"
                  >
                    <image iconName={createBinding(speaker, "mute").as(m => 
                      m ? "audio-volume-muted-symbolic" : "audio-volume-high-symbolic"
                    )} />
                  </button>
                  <slider
                    hexpand
                    value={createBinding(speaker, "volume")}
                    $={(self) => self.connect("value-changed", () => {
                      if (Math.abs(speaker.volume - self.value) > 0.01) {
                        speaker.volume = self.value
                      }
                    })}
                  />
                  <label 
                    label={createBinding(speaker, "volume").as(v => `${Math.round(v * 100)}%`)} 
                    class="popup-data-value"
                    css="min-width: 35px;"
                  />
                </box>
                <label 
                  class="popup-label-detail" 
                  label={createBinding(speaker, "description").as(d => d || "Unknown Device")} 
                  maxWidthChars={30}
                  ellipsize={3}
                />
              </box>

              {/* Input Volume */}
              <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
                <label class="popup-title" label="Microphone Volume" halign={Gtk.Align.START} />
                <box spacing={12} class="popup-data-row">
                  <button 
                    onClicked={() => microphone.mute = !microphone.mute}
                    class="popup-list-item"
                  >
                    <image iconName={createBinding(microphone, "mute").as(m => 
                      m ? "microphone-sensitivity-muted-symbolic" : "microphone-sensitivity-high-symbolic"
                    )} />
                  </button>
                  <slider
                    hexpand
                    value={createBinding(microphone, "volume")}
                    $={(self) => self.connect("value-changed", () => {
                      if (Math.abs(microphone.volume - self.value) > 0.01) {
                        microphone.volume = self.value
                      }
                    })}
                  />
                  <label 
                    label={createBinding(microphone, "volume").as(v => `${Math.round(v * 100)}%`)} 
                    class="popup-data-value"
                    css="min-width: 35px;"
                  />
                </box>
                <label 
                  class="popup-label-detail" 
                  label={createBinding(microphone, "description").as(d => d || "Unknown Mic")} 
                  maxWidthChars={30}
                  ellipsize={3}
                />
              </box>

              <Gtk.Separator class="module-separator" orientation={Gtk.Orientation.HORIZONTAL} />

              {/* Output Devices Selection */}
              <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
                <label class="popup-title" label="Output Devices" halign={Gtk.Align.START} />
                <box orientation={Gtk.Orientation.VERTICAL} spacing={2}>
                  <For each={createBinding(wp.audio, "speakers")}>
                    {(s) => (
                      <button 
                        class="popup-list-item"
                        onClicked={() => s.is_default = true}
                      >
                        <box spacing={8}>
                          <image iconName={createBinding(s, "volumeIcon")} />
                          <label 
                            label={createBinding(s, "description")} 
                            hexpand 
                            halign={Gtk.Align.START} 
                            class="popup-data-key"
                            maxWidthChars={22}
                            ellipsize={3}
                          />
                          <image 
                            iconName="object-select-symbolic" 
                            visible={createBinding(wp, "defaultSpeaker").as(def => def === s)} 
                          />
                        </box>
                      </button>
                    )}
                  </For>
                </box>
              </box>

              {/* Input Devices Selection */}
              <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
                <label class="popup-title" label="Input Devices" halign={Gtk.Align.START} />
                <box orientation={Gtk.Orientation.VERTICAL} spacing={2}>
                  <For each={createBinding(wp.audio, "microphones")}>
                    {(m) => (
                      <button 
                        class="popup-list-item"
                        onClicked={() => m.is_default = true}
                      >
                        <box spacing={8}>
                          <image iconName={createBinding(m, "volumeIcon")} />
                          <label 
                            label={createBinding(m, "description")} 
                            hexpand 
                            halign={Gtk.Align.START} 
                            class="popup-data-key"
                            maxWidthChars={22}
                            ellipsize={3}
                          />
                          <image 
                            iconName="object-select-symbolic" 
                            visible={createBinding(wp, "defaultMicrophone").as(def => def === m)} 
                          />
                        </box>
                      </button>
                    )}
                  </For>
                </box>
              </box>

              <button 
                class="popup-list-item"
                onClicked={() => execAsync("pavucontrol")}
                css="margin-top: 8px; background-color: rgba(255,255,255,0.03);"
              >
                <box spacing={8} halign={Gtk.Align.CENTER} hexpand>
                  <image iconName="preferences-system-symbolic" />
                  <label label="Audio Settings" class="popup-data-value" />
                </box>
              </button>
            </box>
          </Gtk.ScrolledWindow>
        </box>
      </popover>
    </menubutton>
  )
}


function Tray() {
  const tray = AstalTray.get_default()
  const items = createBinding(tray, "items")

  const init = (btn: Gtk.MenuButton, item: AstalTray.TrayItem) => {
    btn.menuModel = item.menuModel
    btn.insert_action_group("dbusmenu", item.actionGroup)
    item.connect("notify::action-group", () => {
      btn.insert_action_group("dbusmenu", item.actionGroup)
    })
  }

  return (
    <box>
      <For each={items}>
        {(item) => (
          <menubutton $={(self) => init(self, item)}>
            <image gicon={createBinding(item, "gicon")} />
          </menubutton>
        )}
      </For>
    </box>
  )
}

function Clock({ format = "%H:%M" }) {
  const time = createPoll("", 1000, () => {
    return GLib.DateTime.new_now_local().format(format)!
  })

  return (
    <menubutton>
      <label label={time} />
      <popover>
        <Gtk.Calendar />
      </popover>
    </menubutton>
  )
}

function Mpris() {
  const mpris = AstalMpris.get_default()
  const apps = new AstalApps.Apps()
  const players = createBinding(mpris, "players")

  return (
    <menubutton>
      <box>
        <For each={players}>
          {(player) => {
            const [app] = apps.exact_query(player.entry)
            return <image visible={!!app.iconName} iconName={app?.iconName} />
          }}
        </For>
      </box>
      <popover>
        <box spacing={4} orientation={Gtk.Orientation.VERTICAL}>
          <For each={players}>
            {(player) => (
              <box spacing={4} widthRequest={200}>
                <box overflow={Gtk.Overflow.HIDDEN} css="border-radius: 8px;">
                  <image
                    pixelSize={64}
                    file={createBinding(player, "coverArt")}
                  />
                </box>
                <box
                  valign={Gtk.Align.CENTER}
                  orientation={Gtk.Orientation.VERTICAL}
                >
                  <label xalign={0} label={createBinding(player, "title")} />
                  <label xalign={0} label={createBinding(player, "artist")} />
                </box>
                <box hexpand halign={Gtk.Align.END}>
                  <button
                    onClicked={() => player.previous()}
                    visible={createBinding(player, "canGoPrevious")}
                  >
                    <image iconName="media-seek-backward-symbolic" />
                  </button>
                  <button
                    onClicked={() => player.play_pause()}
                    visible={createBinding(player, "canControl")}
                  >
                    <box>
                      <image
                        iconName="media-playback-start-symbolic"
                        visible={createBinding(
                          player,
                          "playbackStatus",
                        )((s) => s === AstalMpris.PlaybackStatus.PLAYING)}
                      />
                      <image
                        iconName="media-playback-pause-symbolic"
                        visible={createBinding(
                          player,
                          "playbackStatus",
                        )((s) => s !== AstalMpris.PlaybackStatus.PLAYING)}
                      />
                    </box>
                  </button>
                  <button
                    onClicked={() => player.next()}
                    visible={createBinding(player, "canGoNext")}
                  >
                    <image iconName="media-seek-forward-symbolic" />
                  </button>
                </box>
              </box>
            )}
          </For>
        </box>
      </popover>
    </menubutton>
  )
}


function Battery() {
  const battery = AstalBattery.get_default()
  const powerprofiles = AstalPowerProfiles.get_default()

  const percent = createBinding(
    battery,
    "percentage",
  )((p) => `${Math.floor(p * 100)}%`)

  const stateLabel = createBinding(battery, "state").as(s => {
    switch(s) {
      case AstalBattery.State.CHARGING: return "Carregant"
      case AstalBattery.State.DISCHARGING: return "Descarregant"
      case AstalBattery.State.FULLY_CHARGED: return "Completament carregada"
      case AstalBattery.State.EMPTY: return "Buida"
      default: return "Desconegut"
    }
  })

  return (
    <menubutton class="battery" visible={createBinding(battery, "isPresent")}>
      <box spacing={4}>
        <image iconName={createBinding(battery, "iconName")} class="battery-icon" />
        <label label={percent} />
      </box>
      <popover class="network-popover">
        <box orientation={Gtk.Orientation.VERTICAL} widthRequest={300}>
          {/* Theme Selection */}
          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
            <label class="popup-title" label="System Themes" halign={Gtk.Align.START} />
            <Gtk.ScrolledWindow heightRequest={120} vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC} class="popup-scroll">
              <box orientation={Gtk.Orientation.VERTICAL} spacing={2}>
                <For each={themesState}>
                  {(theme) => (
                    <button 
                      class="popup-list-item"
                      onClicked={() => themeService.setTheme(theme.name)}
                    >
                      <box spacing={8}>
                        <label label={theme.name} hexpand halign={Gtk.Align.START} class="popup-data-key" />
                        <image 
                          iconName="object-select-symbolic" 
                          visible={themeService.currentTheme.as((t) => t.name === theme.name)} 
                        />
                      </box>
                    </button>
                  )}
                </For>
              </box>
            </Gtk.ScrolledWindow>
          </box>

          {/* Battery Info */}
          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
            <label class="popup-title" label="Battery Status" halign={Gtk.Align.START} />
            <box spacing={16} valign={Gtk.Align.CENTER}>
              <image iconName={createBinding(battery, "iconName")} css="font-size: 32px; color: var(--green);" />
              <box orientation={Gtk.Orientation.VERTICAL} hexpand>
                <label class="popup-value-large" label={percent} />
                <label class="popup-label-detail" label={stateLabel} />
                <levelbar value={createBinding(battery, "percentage")} css="margin-top: 6px; min-height: 4px;" />
              </box>
            </box>
          </box>

          {/* Power Details */}
          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
            <label class="popup-title" label="Energy Details" halign={Gtk.Align.START} />
            <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
              <box class="popup-data-row">
                <label label="Consumption" class="popup-data-key" hexpand halign={Gtk.Align.START} />
                <label label={createBinding(battery, "energyRate").as(r => `${r.toFixed(2)} W`)} class="popup-data-value" />
              </box>
              <box class="popup-data-row">
                <label label="Health" class="popup-data-key" hexpand halign={Gtk.Align.START} />
                <label label={createBinding(battery, "capacity").as(c => `${Math.round(c * 100)}%`)} class="popup-data-value" />
              </box>
            </box>
          </box>
        </box>
      </popover>
    </menubutton>
  )
}

export default function Bar2(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      visible
      name="bar2"
      class="Bar2"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}
      application={app}
      css={themeService.cssVars}
    >
      <centerbox>
        <box $type="start" spacing={0} valign={Gtk.Align.CENTER}>
          <box class="module">
            <Workspaces />
          </box>
          <Gtk.Separator class="module-separator" orientation={Gtk.Orientation.VERTICAL} />
          <box class="module">
            <ActiveWindow />
          </box>
        </box>

        <box $type="center" valign={Gtk.Align.CENTER}>
          <box class="module">
            <Clock format="%H:%M - %A %d %b" />
          </box>
        </box>

        <box $type="end" spacing={0} valign={Gtk.Align.CENTER}>
          <box class="module">
            <Mpris />
          </box>

          <Gtk.Separator class="module-separator" orientation={Gtk.Orientation.VERTICAL} />

          <box class="module" spacing={8}>
            <Battery />
            <CPU />
            <Memory />
            <Disk />
          </box>

          <Gtk.Separator class="module-separator" orientation={Gtk.Orientation.VERTICAL} />

          <box class="module" spacing={8}>
            <AudioOutput />
            <Wireless />
          </box>

          <Gtk.Separator class="module-separator" orientation={Gtk.Orientation.VERTICAL} />

          <box class="module tray">
            <Tray />
          </box>
        </box>
      </centerbox>
    </window>
  )
}
