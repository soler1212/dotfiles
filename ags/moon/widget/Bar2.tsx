import app from "ags/gtk4/app"
import { Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { createPoll } from "ags/time"
import { With, For, createComputed, createBinding } from "ags"
import GLib from "gi://GLib"
import AstalBattery from "gi://AstalBattery"
import AstalPowerProfiles from "gi://AstalPowerProfiles"
import AstalWp from "gi://AstalWp"
import AstalNetwork from "gi://AstalNetwork"
import AstalTray from "gi://AstalTray"
import AstalMpris from "gi://AstalMpris"
import AstalApps from "gi://AstalApps"

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
            hola
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
  const usage = createPoll("", 2000, "top -bn1", (out) => {
    const match = out.match(/%Cpu\(s\):\s+([\d.]+)\s+us/)
    return match ? `${match[1]}% 󰘚` : "0% 󰘚"
  })
  return (
    <box class="cpu">
      <label label={usage} />
    </box>
  )
}

// Memory Usage
function Memory() {
  const ram = createPoll("", 2000, "free", (out) => {
    const lines = out.split("\n")
    const mem = lines[1].split(/\s+/)
    const total = parseInt(mem[1])
    const used = parseInt(mem[2])
    return `${Math.round((used / total) * 100)}% 󰍛`
  })
  return (
    <box class="memory">
      <label label={ram} />
    </box>
  )
}

// Battery
// function Battery() {
//   const capacity = createPoll("", 5000, "cat /sys/class/power_supply/BAT0/capacity", (out) => out.trim())
//   const status = createPoll("", 5000, "cat /sys/class/power_supply/BAT0/status", (out) => out.trim())
//
//   const labelValue = createComputed(() => {
//     const bat = capacity.get()
//     const stat = status.get()
//     const icon = stat === "Charging" ? "󰂄" : "󰁹"
//     return `${bat}% ${icon}`
//   })
//
//   return (
//     <box class="battery">
//       <label label={labelValue} />
//     </box>
//   )
// }
//
// Audio (Pulseaudio/Wireplumber)
function Audio() {
  const volume = createPoll("", 500, "wpctl get-volume @DEFAULT_AUDIO_SINK@", (out) => {
    const match = out.match(/Volume: ([\d.]+)/)
    if (!match) return "0% 󰕾"
    const vol = Math.round(parseFloat(match[1]) * 100)
    const muted = out.includes("[MUTED]")
    return muted ? "󰝟 Muted" : `${vol}% 󰕾`
  })

  return (
    <button class="pulseaudio" onClicked={() => execAsync("pavucontrol")}>
      <label label={volume} />
    </button>
  )
}

// Network
function Network() {
  const connection = createPoll("", 5000, "nmcli -t -f active,ssid dev wifi", (out) => {
    const active = out.split("\n").find(line => line.startsWith("yes"))
    const ssid = active ? active.split(":")[1] : "Disconnected"
    return ssid === "Disconnected" ? "Disconnected 󰤭" : `${ssid} 󰤨`
  })

  return (
    <box class="network">
      <label label={connection} />
    </box>
  )
}

function Wireless() {
  const network = AstalNetwork.get_default()
  const wifi = createBinding(network, "wifi")

  const sorted = (arr: Array<AstalNetwork.AccessPoint>) => {
    return arr.filter((ap) => !!ap.ssid).sort((a, b) => b.strength - a.strength)
  }

  async function connect(ap: AstalNetwork.AccessPoint) {
    // connecting to ap is not yet supported
    // https://github.com/Aylur/astal/pull/13
    try {
      await execAsync(`nmcli d wifi connect ${ap.bssid}`)
    } catch (error) {
      // you can implement a popup asking for password here
      console.error(error)
    }
  }

  return (
    <box visible={wifi(Boolean)}>
      <With value={wifi}>
        {(wifi) =>
          wifi && (
            <menubutton>
              <image iconName={createBinding(wifi, "iconName")} />
              <popover>
                <box orientation={Gtk.Orientation.VERTICAL}>
                  <For each={createBinding(wifi, "accessPoints")(sorted)}>
                    {(ap: AstalNetwork.AccessPoint) => (
                      <button onClicked={() => connect(ap)}>
                        <box spacing={4}>
                          <image iconName={createBinding(ap, "iconName")} />
                          <label label={createBinding(ap, "ssid")} />
                          <image
                            iconName="object-select-symbolic"
                            visible={createBinding(
                              wifi,
                              "activeAccessPoint",
                            )((active) => active === ap)}
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
    <menubutton visible={createBinding(battery, "isPresent")}>
      <box>
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
      // exclusivity and anchor might need adjustment if they moved
      // but let's stick to the props for now as the guide implies JSX handles it
      exclusivity={1} // EXCLUSIVE
      anchor={15} // TOP | LEFT | RIGHT
      application={app}
    >
      <centerbox>
        <box $type="start" spacing={4} >
          <Workspaces />
        </box>
        <box $type="center">
          <ActiveWindow />
        </box>
        <box $type="end" spacing={4}>
          <Tray/>
          <AudioOutput />
<Wireless />
<Mpris/>
       <Clock /> 
      {/* <Audio /> */}
      {/* <Network /> */}
      {/* <CPU /> */}
      {/* <Memory /> */}
      <Battery />
        </box>
      </centerbox>
    </window>
  )
}
