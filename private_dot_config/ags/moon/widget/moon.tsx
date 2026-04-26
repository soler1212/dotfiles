import { Astal, Gtk } from "ags/gtk4"
import { moonService } from "../services/moon"
import { themeService } from "../ThemeService"
import { createState } from "ags"

const helpState = createState<string | null>(null)

const HELP_CONTENT: Record<string, { title: string, body: string }> = {
    "phases": {
        title: "FASES LUNARS",
        body: "• Nova: 0%\n• Creixent: 1-49%\n• Quart: 50%\n• Gibosa: 51-99%\n• Plena: 100%\n• Minvant: 99-1%"
    },
    "illum": {
        title: "IL·LUMINACIÓ",
        body: "Percentatge de la cara lunar visible des de la Terra que està il·luminada pel Sol."
    },
    "trend": {
        title: "CICLE LUNAR",
        body: "CREIXENT: La llum augmenta cap a la Lluna Plena.\nMINVANT: La llum disminueix cap a la Lluna Nova."
    },
    "astro": {
        title: "DADES HORÀRIES",
        body: "Horaris aproximats de la sortida i la posta dels astres segons la teva ubicació."
    }
}

export default function MoonWidget(monitor = 0) {
    const { BOTTOM, RIGHT } = Astal.WindowAnchor
    const [currentHelp, setHelp] = helpState

    return (
        <window
            visible
            name={`moon-${monitor}`}
            class="MoonWindow"
            gdkmonitor={monitor}
            layer={Astal.Layer.BOTTOM}
            anchor={BOTTOM | RIGHT}
            css={themeService.cssVars}>
            
            <box class="aleix-widget" orientation={Gtk.Orientation.VERTICAL}>
                <box orientation={Gtk.Orientation.VERTICAL}>
                    {/* MONITOR VIEW */}
                    <box class="aleix-body" orientation={Gtk.Orientation.VERTICAL} spacing={16} visible={currentHelp.as(v => v === null)}>
                        {/* Header Minimalista Personalitzat */}
                        <box spacing={12} valign={Gtk.Align.CENTER}>
                            <label class="aleix-header-title" label="EL PC DE L'ALEIX" />
                            <box hexpand />
                            <button class="aleix-help-btn" onClicked={() => setHelp("phases")}>
                                <label label="󰘥" />
                            </button>
                        </box>

                        <box spacing={20} class="aleix-main-info">
                            <label 
                                class="aleix-emoji"
                                label={moonService.as(m => m.phase_emoji)} 
                            />
                            <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} hexpand>
                                <label class="aleix-phase-cat" label={moonService.as(m => m.phase_name_cat)} halign={Gtk.Align.START} />
                                <label class="aleix-phase-en" label={moonService.as(m => `(${m.phase_name})`)} halign={Gtk.Align.START} />
                            </box>
                        </box>

                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6}>
                            <box spacing={8}>
                                <label class="aleix-label" label="LLUMINOSITAT" />
                                <button class="aleix-help-btn" onClicked={() => setHelp("illum")}>
                                    <label label="󰋗" />
                                </button>
                                <label class="aleix-value-accent" label={moonService.as(m => `${m.illumination}%`)} hexpand halign={Gtk.Align.END} />
                            </box>
                            <levelbar 
                                class="aleix-bar"
                                value={moonService.as(m => (parseInt(m.illumination) || 0) / 100)} 
                            />
                        </box>

                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <box spacing={8}>
                                <label class="aleix-label" label="ESTAT" />
                                <label class="aleix-value" label={moonService.as(m => m.is_waxing ? "Creixent" : "Minvant")} hexpand halign={Gtk.Align.END} 
                                       css={moonService.as(m => `color: ${m.is_waxing ? "var(--green)" : "var(--red)"};`)} />
                                <button class="aleix-help-btn" onClicked={() => setHelp("trend")}>
                                    <label label="󰋗" />
                                </button>
                            </box>
                            <box spacing={8}>
                                <label class="aleix-label" label="PROPERA FASE" />
                                <label class="aleix-value" label={moonService.as(m => m.next_phase)} hexpand halign={Gtk.Align.END} />
                            </box>
                        </box>

                        <box class="aleix-astro-section" orientation={Gtk.Orientation.VERTICAL} spacing={8}>
                            <box spacing={8}>
                                <label class="aleix-label" label="HORARIS ASTRONÒMICS" />
                                <button class="aleix-help-btn" onClicked={() => setHelp("astro")}>
                                    <label label="󰋗" />
                                </button>
                            </box>
                            <box spacing={12} halign={Gtk.Align.START}>
                                <label class="aleix-mini-val" label={moonService.as(m => `󰖜 LLUNA: ${m.moonrise} / ${m.moonset}`)} />
                            </box>
                            <box spacing={12} halign={Gtk.Align.START}>
                                <label class="aleix-mini-val" label={moonService.as(m => `󰖙 SOL  : ${m.sunrise} / ${m.sunset}`)} />
                            </box>
                        </box>
                    </box>

                    {/* HELP VIEW */}
                    <box class="aleix-body" orientation={Gtk.Orientation.VERTICAL} spacing={12} visible={currentHelp.as(v => v !== null)}>
                        <label class="aleix-header-title" label={currentHelp.as(v => v ? HELP_CONTENT[v]?.title || "HELP" : "HELP")} />
                        <box class="aleix-divider" />
                        <label 
                            class="aleix-help-text" 
                            label={currentHelp.as(v => v ? HELP_CONTENT[v]?.body || "" : "")} 
                            wrap 
                            halign={Gtk.Align.START} 
                        />
                        <box hexpand vexpand />
                        <button class="aleix-return-btn" onClicked={() => setHelp(null)}>
                            <label label="TORNA AL MONITOR" />
                        </button>
                    </box>
                </box>
            </box>
        </window>
    )
}
