import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { themeService } from "../ThemeService"
import { Workspaces } from "./components/Workspaces"
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
      <centerbox 
        class="bar-inner" 
        css={themeService.barStyle}
      >
        <box $type="start" spacing={0} valign={Gtk.Align.CENTER}>
          <box class="module">
            <Workspaces />
          </box>
          <ModuleSeparator />
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

          <ModuleSeparator />

          <box class="module tray" spacing={8}>
            <Tray />
            <Bluetooth />
          </box>

          <ModuleSeparator />

          <box class="module" spacing={12}>
            <Wireless />
            <AudioOutput />
          </box>

          <ModuleSeparator />

          <box class="module" spacing={12}>
            <Disk />
            <CPU />
            <Memory />
          </box>

          <ModuleSeparator />

          <box class="module">
            <Battery />
          </box>
        </box>
      </centerbox>
    </window>
  )
}
