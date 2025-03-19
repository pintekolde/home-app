export interface ThermostatRoom {
  id: string;
  name: string;
}

export interface Room extends ThermostatRoom {
  deviceId: string;
  isOn: boolean;
  brightness: number;
  mode: 'day' | 'night' | 'auto';
}

export interface Camera {
  id: string;
  name: string;
  room: string;
  isActive: boolean;
  streamUrl: string;
}

export interface DeviceInfo {
  name: string;
  model: string;
  version: string;
  lastUpdate: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}

export interface Devices {
  lights: boolean;
  thermostat: boolean;
  security: boolean;
  ac: boolean;
  router: boolean;
}

export interface ThermostatSettings {
  mode: 'cool' | 'heat' | 'off';
  temperature: number;
  timer: number;
} 