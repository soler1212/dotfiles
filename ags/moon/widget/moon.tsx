import { Astal, Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"

const moonPhase = createPoll("🌑", 3600000, `bash -c "curl -s 'wttr.in/?format=%m' || echo '🌑' "`)

export default function MoonWidget(monitor = 0) {
    const { BOTTOM, RIGHT } = Astal.WindowAnchor

    return (
        <window
            visible
            name={`moon-${monitor}`}
            class="MoonWindow"
            gdkmonitor={monitor}
            layer={Astal.Layer.BOTTOM}
            anchor={BOTTOM | RIGHT}>
            <box class="moon-container" orientation={Gtk.Orientation.VERTICAL}>
                <label 
                    class="moon-phase"
                    label={moonPhase} 
                />
                <label 
                    class="moon-label"
                    label="Fase Lunar"
                />
            </box>
        </window>
    )
}
