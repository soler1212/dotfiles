import { Astal, Gtk } from "ags/gtk4"
import { themeService } from "../ThemeService"
import { createClockPoll } from "../services/clock"

const datePoll = createClockPoll("%d/%m/%Y")
const timePoll = createClockPoll("%H:%M:%S")

export default function DateTimeWidget(monitor = 0) {
    const { BOTTOM, LEFT } = Astal.WindowAnchor

    return (
        <window
            visible
            name={`datetime-${monitor}`}
            class="DateTimeWindow"
            gdkmonitor={monitor}
            layer={Astal.Layer.BOTTOM}
            anchor={BOTTOM | LEFT}
            css={themeService.cssVars}>
            
            <box class="aleix-datetime-widget" orientation={Gtk.Orientation.VERTICAL} spacing={4} width-request={140}>
                <label class="aleix-datetime-date" label={datePoll} />
                <label class="aleix-datetime-time" label={timePoll} />
            </box>
        </window>
    )
}
