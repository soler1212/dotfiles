import { Astal, Gtk, Gdk } from "ags/gtk4"
import { themeService } from "../ThemeService"

export function HelloPopup(gdkmonitor: Gdk.Monitor) {
    return (
        <window
            visible={false}
            name="hello-popup"
            class="HelloPopupWindow"
            gdkmonitor={gdkmonitor}
            anchor={Astal.WindowAnchor.CENTER}
            layer={Astal.Layer.OVERLAY}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            css={themeService.cssVars}>
            <box class="hello-popup" spacing={12} orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} halign={Gtk.Align.CENTER}>
                <label class="hello-popup-text" label="hello" />
                <button class="hello-popup-close" onClicked={() => app.get_window("hello-popup")?.hide()}>
                    <label label="✕" />
                </button>
            </box>
        </window>
    )
}
