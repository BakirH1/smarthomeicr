export type DeviceType = 'light' | 'climate' | 'entertainment' | 'appliance';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  isOn: boolean;
  roomId: string;
  icon: string;
  // Type-specific properties
  brightness?: number; // for lights
  colorTemp?: 'warm' | 'neutral' | 'cool'; // for lights
  temperature?: number; // for climate
  mode?: string; // for climate/entertainment
  volume?: number; // for entertainment
  channel?: string; // for entertainment
  timer?: number; // for appliances (minutes)
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  deviceCount: number;
  activeDevices: number;
  temperature?: number;
  humidity?: number;
}

export const deviceTypeColors: Record<DeviceType, string> = {
  light: 'bg-[hsl(45_90%_55%)] text-white',
  climate: 'bg-[hsl(200_70%_55%)] text-white',
  entertainment: 'bg-[hsl(280_70%_55%)] text-white',
  appliance: 'bg-[hsl(25_75%_55%)] text-white',
};

export const deviceTypeLabels: Record<DeviceType, string> = {
  light: 'Lighting',
  climate: 'Climate',
  entertainment: 'Entertainment',
  appliance: 'Appliance',
};