export interface EjectionLog {
  id: string;
  timestamp: string;
  station_name: string;
  powerbank_id: string;
  type: 'Single Eject' | 'Bulk Eject';
  status: 'SUCCESS' | 'FAILED';
}

export interface EjectionStats {
  total_ejections: number;
  active_powerbanks: number;
  last_event_minutes_ago: number;
  last_event_timestamp: string;
}
