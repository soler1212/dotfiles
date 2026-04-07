import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createComputed } from "ags"
import GLib from "gi://GLib"
import { themeService } from "../ThemeService"
import { Workspaces } from "./components/Workspaces"
import { SwayMode } from "./components/SwayMode"
import { ActiveWindow } from "./components/ActiveWindow"
import { Clock } from "./components/Clock"
import { Mpris } from "./components/Mpris"
import { Battery } from "./components/Battery"
import { CPU } from "./components/CPU"
import { Memory } from "./components/Memory"
import { Disk } from "./components/Disk"
import { AudioOutput } from "./components/AudioOutput"
import { Wireless } from "./components/Wireless"
import { Tray } from "./components/Tray"
import { Bluetooth } from "./components/Bluetooth"
import { ModuleSeparator } from "./atoms/Layout"

const clockFormat = () => {
  const now = GLib.DateTime.new_now_local()
  const monthName = now.format("%B")!.toLowerCase()
  const weekday = now.format("%A")!.toLowerCase()
  const preposition = /^[aeiouh]/.test(monthName) ? "d'" : "de "
  return `${weekday} [${now.format("%d")}], ${preposition}${monthName} [${now.format("%m")}] [W${now.format("%V")}] - ${now.format("%H:%M:%S")}`
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const height = createComputed(() => themeService.preset().innerBarHeight)
  const spacing = createComputed(() => themeService.preset().buttonSpacing)
  
  const marginTop = createComputed(() => themeService.getMargins().top)
  const marginBottom = createComputed(() => themeService.getMargins().bottom)
  const marginLeft = createComputed(() => themeService.getMargins().left)
  const marginRight = createComputed(() => themeService.getMargins().right)

  return (
    <window
      visible
      name="bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      /* Ancoratges: LEFT i RIGHT garanteixen l'ample total en qualsevol monitor */
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}
      application={app}
      css={themeService.cssVars}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      heightRequest={height}
    >
      <centerbox 
        class="bar-inner" 
        heightRequest={height} 
        valign={Gtk.Align.START}
        halign={Gtk.Align.FILL}
        hexpand
      >
        <box $type="start" valign={Gtk.Align.CENTER} spacing={spacing} hexpand>
          <box class="module" spacing={spacing}>
            <Workspaces />
            <SwayMode />
          </box>
          <ModuleSeparator />
          <box class="module" spacing={spacing}>
            <ActiveWindow />
          </box>
        </box>

        <box $type="center" valign={Gtk.Align.CENTER} spacing={spacing}>
          <box class="module" spacing={spacing}>
            <Clock format={clockFormat} />
          </box>
        </box>

        <box $type="end" valign={Gtk.Align.CENTER} spacing={spacing} hexpand halign={Gtk.Align.END}>
          <box class="module" spacing={spacing}>
            <Mpris />
          </box>

          <ModuleSeparator />
          <box class="module tray" spacing={spacing}>
            <Tray />
            <Bluetooth />
          </box>

          <ModuleSeparator />

          <box class="module" spacing={spacing}>
            <Wireless />
            <AudioOutput />
          </box>

          <ModuleSeparator />

          <box class="module" spacing={spacing}>
            <Disk />
            <CPU />
            <Memory />
          </box>

          <ModuleSeparator />

          <box class="module" spacing={spacing}>
            <Battery />
          </box>
        </box>
      </centerbox>
    </window>
  )
}
