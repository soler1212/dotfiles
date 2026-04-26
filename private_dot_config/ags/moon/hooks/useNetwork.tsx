import { createPoll } from "ags/time"
import AstalNetwork from "gi://AstalNetwork"
import { IconImage, NetworkData } from "../types/network";

export const useNetwork = () => {
  const DEFAULT_MESSAGES = {
    "not-connected": "Desconectado 󰤭",
    "network-error": "Error de Red 󰤭"
  }

  // 1. Només IPs (Privada i Pública) separades del nmcli
  const getNetworkBindings = () => {
    // IPs privades - S'actualitza cada 5 segons
    const privateIps = createPoll<string[] | string>(
      "Buscant...",
      5000,
      `bash -c "hostname -I || true"`,
      (out) => {
        try {
          const ips = out.trim().split(" ").filter(ip => ip.length > 0);
          return ips.length > 0 ? ips : "No disponible";
        } catch (e) {
          return DEFAULT_MESSAGES["network-error"];
        }
      }
    );

    // IP Pública - S'actualitza 1 cop cada hora per evitar bloquejos (rate-limits)
    const publicIp = createPoll<string>(
      "Buscant...",
      3600000, // 1 hora
      `bash -c "curl -s -m 2 ifconfig.me || echo 'No disponible'"`,
      (out) => out.trim() || "No disponible"
    );

    return { privateIps, publicIp };
  };

  // 2. Només Wi-Fi (L'original que ja tenies tu)
  const getActiveNetworkData = () => {
    return createPoll<NetworkData | string>(
      "Buscant... 󰤫",
      5000,
      `bash -c "nmcli -t -f IN-USE,SSID,RATE,SIGNAL dev wifi || true"`,
      (out) => {
        try {
          const active = out.split("\n").find(line => line.startsWith("*"))

          if (!active) return DEFAULT_MESSAGES["not-connected"];

          const [_, ssid, rate, signal] = active.split(":")

          const s = parseInt(signal);
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
      }
    )
  }

  /*
  * Retona icones dinàmics segons la qualitat de la senyal
  */
  // Retornem un objecte amb el nom de la icona i les classes CSS
  function getNetworkImage(signalQuality: number): IconImage {
    if (signalQuality === 100) {
      return { iconName: "network-wireless-signal-excellent", className: "excelent-connection" };
    }
    else if (signalQuality > 80) {
      return { iconName: "network-wireless-signal-excellent", className: "" };
    }
    else if (signalQuality > 60) {
      return { iconName: "network-wireless-signal-good", className: "" };
    }
    else if (signalQuality > 40) {
      return { iconName: "network-wireless-signal-weak", className: "" };
    }
    else {
      return { iconName: "network-wireless-signal-none-symbolic", className: "" };
    }
  }

  const connectAccessPoint = async (ap: AstalNetwork.AccessPoint) => {
    // connecting to ap is not yet supported
    // https://github.com/Aylur/astal/pull/13
    try {
      // Faltava importar execAsync de 'ags/utils' o 'astal/process', assegurat de tenir-ho a dalt!
      // await execAsync(`nmcli d wifi connect ${ap.bssid}`)
    } catch (error) {
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
    sortedAccessPoints,
    getNetworkBindings
  }
}
