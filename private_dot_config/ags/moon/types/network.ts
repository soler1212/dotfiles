
export type IconImage = { iconName: string, className: string };
  
export interface NetworkData {
  ssid: string;
  signal: number;
  rate: number;
  icon: IconImage;
}
