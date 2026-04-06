import { Astal, Gtk } from "ags/gtk4"
import { moonService } from "../services/moon"
import { themeService } from "../ThemeService"

export default function MoonWidget(monitor = 0) {
    const { BOTTOM, RIGHT } = Astal.WindowAnchor

    return (
        <window
            visible
            name={`moon-${monitor}`}
            class="MoonWindow"
            gdkmonitor={monitor}
            layer={Astal.Layer.BOTTOM}
            anchor={BOTTOM | RIGHT}
            css={themeService.cssVars}>
            <box class="moon-container" orientation={Gtk.Orientation.VERTICAL}>
                <label 
                    class="moon-phase"
                    label={moonService.as(m => m.phase_emoji)} 
                />
                <label 
                    class="moon-title"
                    label={moonService.as(m => m.phase_name)}
                />
                <box class="moon-divider" />
                <box orientation={Gtk.Orientation.VERTICAL} spacing={4} class="moon-details">
                    <label 
                        class="moon-info" 
                        label={moonService.as(m => `Il·luminació: ${m.illumination}%`)} 
                        halign={Gtk.Align.START} 
                    />
                    <box spacing={12}>
                        <label 
                            class="moon-info-small" 
                            label={moonService.as(m => `Sortida: ${m.moonrise}`)} 
                        />
                        <label 
                            class="moon-info-small" 
                            label={moonService.as(m => `Posta: ${m.moonset}`)} 
                        />
                    </box>
                </box>
            </box>
        </window>
    )
}
