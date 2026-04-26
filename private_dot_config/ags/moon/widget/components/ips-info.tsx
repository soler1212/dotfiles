import { Gtk } from "ags/gtk4"
import { Accessor, createBinding, With } from "ags"

export interface Props {
  privateIps: Accessor<string[] | string>
  publicIp: Accessor<string>
}

export const IPsInfo = ({ privateIps, publicIp }: Props) => {
  // 1. Creem el botó de toggle
  const toggle = (
    <togglebutton
      halign={Gtk.Align.END}
      valign={Gtk.Align.CENTER}
      class="reveal-ip-btn"
      tooltipText="Mostrar/Amagar IP Pública"
    />
  )

  // 2. Binding de l'estat del botó (true/false)
  const isRevealed = createBinding(toggle, "active")

  // 3. Assignem la icona reactiva al botó
  toggle.child = (
    <image iconName={isRevealed.as(rev => 
      rev ? "view-conceal-symbolic" : "view-reveal-symbolic"
    )} />
  )

  return (
    <box
      orientation={Gtk.Orientation.VERTICAL}
      spacing={8}
    >

      {/* 1. Fila de IPs Privades (Icona + Text) */}
      <box orientation={Gtk.Orientation.HORIZONTAL} spacing={8} class="ip-row private-ip">
        <image
          iconName="network-wired-symbolic" // Icona de xarxa local/cable
          class="ip-icon"
        />
        <label
          halign={Gtk.Align.START} // Alineem el text a l'esquerra
          class="ip-label"
          label={privateIps.as((data) => {
            if (typeof data === "string") return `Local: ${data}`;
            return `Local: ${data.join(", ")}`;
          })}
        />
      </box>

      {/* 2. Fila de la IP Pública corregida per evitar nesting de With/Fragments */}
      <box orientation={Gtk.Orientation.HORIZONTAL} spacing={8} class="ip-row public-ip">
        <image
          iconName="applications-internet-symbolic" // Icona de bola del món / internet
          class="ip-icon"
        />
        
        <With value={publicIp}>
          {(ip) => (
            <label
              halign={Gtk.Align.START}
              class="ip-label"
              hexpand
              label={isRevealed.as(revealed => 
                revealed ? `Pública: ${ip}` : "Pública: ***.***.***.***"
              )}
            />
          )}
        </With>

        {toggle}
      </box>

    </box>
  )
}
