import { createPoll } from "ags/time"
import AstalNetwork from "gi://AstalNetwork"


export interface NetworkData {
  ssid: string;
  signal: number;
  rate: number;
  icon: ReturnType<getNetworkIcon>;
}

export const useNetwork = () => {
  const DEFAULT_MESSAGES = {
    "not-connected": "Desconectado 󰤭",
    "network-error": "Error de Red 󰤭"
  }

  const getActiveNetworkData = () => {

    return createPoll<NetworkData | string>(
      "Buscant... 󰤫",
      5000,
      "nmcli -t -f IN-USE,SSID,RATE,SIGNAL dev wifi",
      (out) => {
        try {
          /*
            El retorn de nmlci és(on * és la xarxa activa):
              :DIGIFIBRA-Kb2F:130 Mbit/s:100
               :MIWIFI_SDzf_2G:260 Mbit/s:100
               ::540 Mbit/s:100
              *:MIWIFI_SDzf_5G:540 Mbit/s:74
               :vodafone4558_5G:540 Mbit/s:59
               :DIGIFIBRA-PLUS-Kb2F:270 Mbit/s:19
          */
          const active = out.split("\n").find(line => line.startsWith("*"))

          if (!active) return DEFAULT_MESSAGES["not-connected"];

          const [_, ssid, rate, signal] = active.split(":")

          const s = parseInt(signal);
          print(ssid, rate, signal)
          const icon = getNetworkImage(s)
          return {
            ssid,
            rate,
            signal: s,
            icon
          }
        } catch (e) {
          return DEFAULT_MESSAGES["network-error"];
        }
      })
  }



  /*
  * Retona icones dinàmics segona la qualitat de la senyal
  */
  function getNetworkImage(signalQuality: number) {
    /* <image iconName={"airplane-mode-symbolic"} /> */
    /* <image iconName={"network-wired-symbolic"} /> */
    let icon = <image iconName={"network-wireless-signal-none-symbolic"} />; // Aquest no esta bé no pilla icona
    print(signalQuality)
    if (signalQuality === 100) {
      icon = <image iconName={"network-wireless-signal-excellent"} class="excelent-connection" />
    }
    else if (signalQuality > 80) {
      icon = <image iconName={"network-wireless-signal-excellent"} />
    }
    else if (signalQuality > 60) {
      icon = <image iconName={"network-wireless-signal-good"} />
    }
    else if (signalQuality > 40) {
      icon = <image iconName={"network-wireless-signal-weak"} />
    }
    else {
      icon = <image iconName={"network-wireless-signal-weak"} />
    }


    return icon;

  }


  const connectAccessPoint = async (ap: AstalNetwork.AccessPoint) => {
    // connecting to ap is not yet supported
    // https://github.com/Aylur/astal/pull/13
    try {
      await execAsync(`nmcli d wifi connect ${ap.bssid}`)
    } catch (error) {
      // you can implement a popup asking for password here
      console.error(error)
      //TODO: Aquesta part posar-la com a customHook a banda
    }
  }


  const sortedAccessPoints = (arr: Array<AstalNetwork.AccessPoint>) => {
    return arr.filter((ap) => !!ap.ssid).sort((a, b) => b.strength - a.strength)
  }

  return {
    getNetworkImage,
    getActiveNetworkData,
    connectAccessPoint,
    sortedAccessPoints
  }
}
