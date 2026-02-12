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

export interface IoTHistoryRecord {
  id: string;
  action_type: string;
  performed_from: string;
  powerbank_sn: string | null;
  slot_number: number | null;
  is_free_ejection: boolean;
  is_successful: boolean;
  error_message: string | null;
  created_at: string;
}

export interface IoTHistoryParams {
  action_type?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  page_size?: number;
  [key: string]: string | number | undefined;
}

export interface IoTHistoryResponse {
  success: boolean;
  message: string;
  data: {
    results: IoTHistoryRecord[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_count: number;
      page_size: number;
      has_next: boolean;
      has_previous: boolean;
      next_page: number | null;
      previous_page: number | null;
    };
  };
}
