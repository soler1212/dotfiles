import { Gtk } from "ags/gtk4"
import { NetworkData, useNetwork } from "../../hooks/useNetwork"


export interface Props {
  networkData: NetworkData
}
export const CurrentNetworkInfo = ({ networkData }: Props) => {
  return (

    <box orientation={Gtk.Orientation.VERTICAL}>
      <label label={`${networkData.ssid}`} />
      <box valign={Gtk.Align.CENTER}>
        <label label={`${networkData.signal}% ${networkData.rate}`} />
      </box>
    </box>
  )
}
