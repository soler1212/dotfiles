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
  const usage = createPoll(0, 2000, "top -bn1", (out) => {
    const match = out.match(/%Cpu\(s\):\s+([\d.,]+)\s+us/)
    if (match) {
      const val = match[1].replace(",", ".")
      return Math.round(parseFloat(val))
    }
    return 0
  })
  return (
    <box class="cpu" spacing={4}>
      <label label="󰘚" />
      <label label={usage.as((u) => `${u}%`)} />
    </box>
  )
}

// Memory Usage
function Memory() {
  const ram = createPoll(0, 2000, "free", (out) => {
    const lines = out.split("\n")
    const mem = lines[1].trim().split(/\s+/)
    const total = parseInt(mem[1])
    const available = parseInt(mem[6])
    const used = total - available
    return Math.round((used / total) * 100)
  })
  return (
    <box class="memory" spacing={4}>
      <label label="󰍛" />
      <label label={ram.as((r) => `${r}%`)} />
    </box>
  )
}

function Disk() {
  const disk = createPoll({ used: "0", total: "0", percent: 0 }, 5000, "df -h /", (out) => {
    const lines = out.split("\n")
    const parts = lines[1].split(/\s+/)
    return {
      used: parts[2],
      total: parts[1],
      percent: parseInt(parts[4].replace("%", "")),
    }
  })

  return (
    <box class="disk" spacing={4}>
      <label label="󰋊" />
      <label label={disk.as((d) => `${d.used}/${d.total}`)} />
    </box>
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
                <box orientation={Gtk.Orientation.VERTICAL} spacing={12}>
                  {/* Status Section */}
                  <box orientation={Gtk.Orientation.VERTICAL} class="network-card status-section" spacing={8}>
                    <CurrentNetworkInfo networkData={activeNetwork} />
                    <Gtk.Separator orientation={Gtk.Orientation.HORIZONTAL} />
                    <IPsInfo
                      privateIps={privateIps}
                      publicIp={publicIp}
                    />
                  </box>

                  {/* AP List Section */}
                  <box orientation={Gtk.Orientation.VERTICAL} class="network-card list-section" spacing={8}>
                    <label label="Available Networks" xalign={0} class="section-title" />
                    <Gtk.ScrolledWindow heightRequest={240} vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}>
                      <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
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
  const { defaultSpeaker: speaker } = AstalWp.get_default()!

  return (
    <menubutton>
      <image iconName={createBinding(speaker, "volumeIcon")} />
      <popover>
        <box>
          <slider
            widthRequest={260}
            onChangeValue={({ value }) => speaker.set_volume(value)}
            value={createBinding(speaker, "volume")}
          />

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

  const setProfile = (profile: string) => {
    powerprofiles.set_active_profile(profile)
  }

  return (
    <box spacing={8}>
      <CPU />
      <Memory />
      <Disk />
      <menubutton visible={createBinding(battery, "isPresent")}>
        <box spacing={4}>
          <image iconName={createBinding(battery, "iconName")} />
          <label label={percent} />
        </box>
        <popover>
          <box orientation={Gtk.Orientation.VERTICAL}>
            {powerprofiles.get_profiles().map(({ profile }) => (
              <button onClicked={() => setProfile(profile)}>
                <label label={profile} xalign={0} />
              </button>
            ))}
          </box>
        </popover>
      </menubutton>
    </box>
  )
}

export default function Bar2(gdkmonitor: Gdk.Monitor) {
  // Assuming these are still available in Gtk or ags exports
  // If Astal is dropped, they might be directly in the window props or Gtk namespace
  return (
    <window
      visible
      name="bar2"
      class="Bar2"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}
      application={app}
    >
      <centerbox>
        <box $type="start" spacing={4} >
          <Workspaces />
        </box>
        <box $type="center">
          <ActiveWindow />
        </box>
        <box $type="end" spacing={8}>
          <Tray />
          <AudioOutput />
          <Wireless />
          <Mpris />
          <Battery />
          <Clock />
        </box>
      </centerbox>
    </window>
  )
}
