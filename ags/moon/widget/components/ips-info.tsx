import { Gtk } from "ags/gtk4"
import { Accessor } from "ags"

export interface Props {
  privateIps: Accessor<string[] | string>
  publicIp: Accessor<string>
}

export const IPsInfo = ({ privateIps, publicIp }: Props) => {
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

      {/* 2. Fila de la IP Pública (Icona + Text) */}
      <box orientation={Gtk.Orientation.HORIZONTAL} spacing={8} class="ip-row public-ip">
        <image
          iconName="applications-internet-symbolic" // Icona de bola del món / internet
          class="ip-icon"
        />
        <label
          halign={Gtk.Align.START} // Alineem el text a l'esquerra
          class="ip-label"
          label={publicIp.as((ip) => `Pública: ${ip}`)}
        />
      </box>

    </box>
  )
}
