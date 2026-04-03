import AstalNetwork from "gi://AstalNetwork"
import { Accessor, createBinding } from "ags"
import { useNetwork } from "../../hooks/useNetwork";

export interface Props {
  accessPoint: AstalNetwork.AccessPoint;
  wifi: Accessor<any>
}


export const NetworkAccessPointListItem = ({ accessPoint: ap, wifi }: Props) => {
  const { connectAccessPoint } = useNetwork();

  return (
    <button onClicked={() => connectAccessPoint(ap)}>
      <box spacing={4}>
        <image iconName={createBinding(ap, "iconName")} />
        <label label={createBinding(ap, "ssid")} />
        <image
          iconName="object-select-symbolic"
          visible={createBinding(
            wifi,
            "activeAccessPoint",
          )((active) => active === ap)}
        />
      </box>
    </button>
  )
}
