import { Astal, Gtk } from "ags/gtk4"
import { moonService } from "../services/moon"
import { themeService } from "../ThemeService"
import { createPoll } from "ags/time"
import { createState } from "ags"

const helpState = createState<string | null>(null)

const HELP_CONTENT: Record<string, { title: string, body: string }> = {
    "phases": {
        title: "LUNAR_PHASES_INDEX",
        body: "• Nova: 0% llum\n• Creixent: 1-49%\n• Q. Creixent: 50%\n• Gibosa Creixent: 51-99%\n• Plena: 100% llum\n• Gibosa Minvant: 99-51%\n• Q. Minvant: 50%\n• Minvant: 49-1%"
    },
    "illum": {
        title: "ILLUMINATION_LOGIC",
        body: "Percentatge de la cara visible de la Lluna que rep llum solar directa. Un 100% vol dir que la Terra està entre el Sol i la Lluna."
    },
    "trend": {
        title: "CYCLE_DIRECTION",
        body: "CREIXENT (Waxing): La porció il·luminada augmenta cada nit fins a arribar a Lluna Plena.\nMINVANT (Waning): La llum disminueix fins a la Lluna Nova."
    },
    "astro": {
        title: "ASTRO_TIMINGS_REF",
        body: "S (Sortida): Moment en què l'astre creua l'horitzó est.\nP (Posta): Moment en què l'astre desapareix per l'oest."
    }
}

export default function MoonWidget(monitor = 0) {
    const { BOTTOM, RIGHT } = Astal.WindowAnchor
    const time = createPoll("", 1000, 'date +"%H:%M:%S"')
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
            
            <box class="hacker-terminal" orientation={Gtk.Orientation.VERTICAL}>
                <box class="terminal-header" spacing={8}>
                    <label class="terminal-prompt" label="> " />
                    <label class="terminal-title" label={currentHelp.as(v => v ? "MOON_OS_HELP" : "MOON_MONITOR_v2.2")} />
                    <box hexpand />
                    <label class="terminal-status" label="[SECURED]" />
                </box>

                <box orientation={Gtk.Orientation.VERTICAL}>
                    {/* MONITOR VIEW */}
                    <box class="terminal-body" orientation={Gtk.Orientation.VERTICAL} spacing={16} visible={currentHelp.as(v => v === null)}>
                        <box spacing={16} valign={Gtk.Align.CENTER}>
                            <label class="hacker-hero-emoji" label={moonService.as(m => m.phase_emoji)} />
                            <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
                                <box spacing={8}>
                                    <label class="hacker-phase-name" label={moonService.as(m => m.phase_name_cat)} />
                                    <button class="hacker-help-mini" onClicked={() => setHelp("phases")}><label label="[?]" /></button>
                                </box>
                                <label class="hacker-phase-en" label={moonService.as(m => `(${m.phase_name})`)} />
                            </box>
                        </box>

                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6}>
                            <box spacing={8}>
                                <label class="hacker-label-small" label="LLUMINOSITAT" />
                                <button class="hacker-help-mini" onClicked={() => setHelp("illum")}><label label="[?]" /></button>
                                <label class="hacker-value-small accent" label={moonService.as(m => `${m.illumination}%`)} hexpand halign={Gtk.Align.END} />
                            </box>
                            <levelbar class="hacker-bar" value={moonService.as(m => (parseInt(m.illumination) || 0) / 100)} />
                        </box>

                        <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
                            <box class="hacker-row" spacing={8}>
                                <label class="hacker-label" label="ESTAT ACTUAL:" />
                                <label class="hacker-value" label={moonService.as(m => m.is_waxing ? "Creixent" : "Minvant")} hexpand halign={Gtk.Align.END} 
                                       css={moonService.as(m => `color: ${m.is_waxing ? "#00ff99" : "#ff0055"};`)} />
                                <button class="hacker-help-mini" onClicked={() => setHelp("trend")}><label label="[?]" /></button>
                            </box>
                            <box class="hacker-row" spacing={8}>
                                <label class="hacker-label" label="PROPERA FASE:" />
                                <label class="hacker-value yellow" label={moonService.as(m => m.next_phase)} hexpand halign={Gtk.Align.END} />
                            </box>
                        </box>

                        <box spacing={8}>
                            <label class="terminal-divider" label="[ DADES ASTRONÒMIQUES ]" />
                            <button class="hacker-help-mini" onClicked={() => setHelp("astro")}><label label="[?]" /></button>
                        </box>

                        <box orientation={Gtk.Orientation.VERTICAL} spacing={6}>
                            <box spacing={12}>
                                <label class="hacker-mini-label" label="LLUNA (S/P):" />
                                <label class="hacker-mini-value" label={moonService.as(m => `${m.moonrise} / ${m.moonset}`)} />
                            </box>
                            <box spacing={12}>
                                <label class="hacker-mini-label" label="SOL   (S/P):" />
                                <label class="hacker-mini-value" label={moonService.as(m => `${m.sunrise} / ${m.sunset}`)} />
                            </box>
                        </box>
                    </box>

                    {/* HELP VIEW */}
                    <box class="terminal-body" orientation={Gtk.Orientation.VERTICAL} spacing={12} visible={currentHelp.as(v => v !== null)}>
                        <label class="help-title" label={currentHelp.as(v => v ? HELP_CONTENT[v]?.title || "UNKNOWN_HELP" : "")} halign={Gtk.Align.START} />
                        <box class="terminal-divider-sub" />
                        <label 
                            class="help-body" 
                            label={currentHelp.as(v => v ? HELP_CONTENT[v]?.body || "" : "")} 
                            wrap 
                            halign={Gtk.Align.START} 
                            xalign={0}
                        />
                        <box hexpand vexpand />
                        <button class="hacker-close-btn" onClicked={() => setHelp(null)}><label label="[X] RETURN_TO_MONITOR" /></button>
                    </box>
                </box>

                <box class="terminal-footer">
                    <label class="terminal-timestamp" label={time} />
                    <box hexpand />
                    <label class="terminal-user" label="ROOT@DESKTOP" />
                </box>
            </box>
        </window>
    )
}
