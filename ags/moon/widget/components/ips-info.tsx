import { Gtk } from "ags/gtk4"
import { Binding } from "astal" // Importem Binding per tipar-ho bé
import { Accessor } from "ags"

export interface Props {
  // Ara 'privateIps' és un Binding que conté o un array de strings (les IPs) o un string (error/càrrega)
  privateIps: Accessor<string[] | string>
  // 'publicIp' és un Binding que sempre serà un string
  publicIp: Accessor<string>
}

export const IPsInfo = ({ privateIps, publicIp }: Props) => {
  return (
    <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>

      {/* 1. Resolem les IPs Privades */}
      <label
        label={privateIps.as((data) => {
          // Si 'data' és un string, vol dir que està "Buscant..." o ha donat error
          if (typeof data === "string") return `Xarxa local: ${data}`;

          // Com que a la funció nova 'data' ja és directament l'array d'IPs, només fem el join
          return `IPs Privades: ${data.join(", ")}`;
        })}
      />

      {/* 2. Resolem la IP Pública */}
      <label
        label={publicIp.as((ip) => `IP Pública: ${ip}`)}
      />

    </box>
  )
}
