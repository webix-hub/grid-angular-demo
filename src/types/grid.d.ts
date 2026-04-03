// Grid types specific to the application

export interface Data {
  id: string;
  name: string;
  room_type: string;
  current_temperature: number;
  current_humidity: number;
  target_temperature: number;
  last_updated: string | Date;
  system_status: string;
  installed: string | Date;
  temperature_history: number[];
  star?: number;
}
