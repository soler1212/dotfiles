import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { themeService } from "../ThemeService"

export function DesktopButton(monitor: Gdk.Monitor) {
    return (
        <window
            visible
            name="desktop-button"
            class="DesktopButton"
            gdkmonitor={monitor}
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
            layer={Astal.Layer.BOTTOM}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            application={app}
            css={themeService.cssVars}
            marginTop={50}
            marginLeft={12}>
            <box>
                <button
                    class="wallpaper-desktop-btn"
                    onClicked={() => app.get_window("wallpaper-selector")?.show()}
                    tooltipText="Wallpaper Selector">
                    <label label="󰏪" />
                </button>
            </box>
        </window>
    )
}
