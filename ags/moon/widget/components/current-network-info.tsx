import { Gtk } from "ags/gtk4"
import { Accessor } from "ags"
import { NetworkData } from "../../types/network"

export interface Props {
  networkData: Accessor<NetworkData | string>
}

export const CurrentNetworkInfo = ({ networkData }: Props) => {
  return (
    <box orientation={Gtk.Orientation.VERTICAL}>

      {/* Etiqueta per al SSID (o el missatge d'error/càrrega) */}
      <label
        label={networkData.as((data) => {
          // Si és un string ("Buscant..." o error), el mostrem tal qual
          if (typeof data === "string") return data;
          // Si tenim les dades bones, traiem el SSID
          return data.ssid;
        })}
      />

      {/* Etiqueta per a la Senyal i Velocitat */}
      <box valign={Gtk.Align.CENTER}>
        <label
          label={networkData.as((data) => { // Sense ": any"
            // Si és un string (error o desconnectat), amaguem aquest text
            if (typeof data === "string") return "";
            // Si tenim dades, construïm l'string
            return `${data.signal}% ${data.rate}`;
          })}
        />
      </box>

    </box>
  )
}
