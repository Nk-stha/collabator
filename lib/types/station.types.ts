export interface Station {
  id: string;
  station_name: string;
  serial_number: string;
  imei: string;
  latitude: number;
  longitude: number;
  address: string;
  landmark?: string;
  total_slots: number;
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
  is_maintenance: boolean;
  last_heartbeat: string;
  created_at: string;
  updated_at: string;
  amenities: string[];
  available_slots: number;
  occupied_slots: number;
  total_powerbanks: number;
  available_powerbanks: number;
  distribution: {
    id: string;
    distribution_type: string;
    effective_date: string;
    is_active: boolean;
  } | null;
  assigned_partner: {
    id: string;
    business_name: string;
    code: string;
  } | null;
  revenue_stats: {
    today_transactions: number;
    today_revenue: number;
    this_month_transactions: number;
    this_month_revenue: number;
  };
}

export interface StationListResponse {
  success: boolean;
  message: string;
  data: {
    results: Station[];
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

export interface StationListParams {
  has_vendor?: boolean;
  page?: number;
  page_size?: number;
  search?: string;
  status?: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
  [key: string]: string | number | boolean | undefined;
}

export interface StationSlot {
  id: string;
  slot_number: number;
  status: 'AVAILABLE' | 'OCCUPIED' | 'EMPTY';
  battery_level: number;
  last_updated: string;
  powerbank: {
    id: string;
    serial_number: string;
    model: string;
    capacity_mah: number;
    battery_level: number;
    status: string;
  } | null;
  current_rental_id: string | null;
}

export interface Powerbank {
  id: string;
  serial_number: string;
  model: string;
  capacity_mah: number;
  status: string;
  battery_level: number;
  slot_number: number | null;
  last_updated: string;
}

export interface StationAmenity {
  id: string;
  name: string;
  icon: string;
  description: string;
  is_active: boolean;
  is_available: boolean;
}

export interface StationMedia {
  id: string;
  media_upload_id: string;
  media_type: 'IMAGE' | 'VIDEO';
  title: string;
  description: string;
  is_primary: boolean;
  file_url: string;
  thumbnail_url: string;
  created_at: string;
}

export interface StationDetail {
  id: string;
  station_name: string;
  serial_number: string;
  imei: string;
  latitude: number;
  longitude: number;
  address: string;
  landmark?: string;
  description?: string;
  total_slots: number;
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
  is_maintenance: boolean;
  is_deleted: boolean;
  hardware_info: {
    model: string;
    version: string;
    manufacturer: string;
  };
  last_heartbeat: string;
  opening_time: string;
  closing_time: string;
  created_at: string;
  updated_at: string;
  amenities: StationAmenity[];
  media: StationMedia[];
  slots: StationSlot[];
  powerbanks: Powerbank[];
  distribution: {
    id: string;
    distribution_type: string;
    effective_date: string;
    is_active: boolean;
  } | null;
  assigned_partner: {
    id: string;
    business_name: string;
    code: string;
  } | null;
}

export interface StationDetailResponse {
  success: boolean;
  message: string;
  data: StationDetail;
}

export interface WifiNetwork {
  ssid: string;
  signal_strength: number;
  security: 'WPA' | 'WPA2' | 'WPA3' | 'OPEN';
}

export interface WifiScanRequest {
  station_id: string;
}

export interface WifiScanResponse {
  success: boolean;
  message: string;
  data: {
    station_id: string;
    station_imei: string;
    action_type: string;
    networks: string[];
    message: string;
    iot_history_id: string;
  };
}

export interface WifiConnectRequest {
  ssid: string;
  password: string;
  security_type: string;
}

export interface WifiConnectRequestNew {
  station_id: string;
  wifi_ssid: string;
  wifi_password?: string;
}

export interface WifiConnectResponse {
  success: boolean;
  message: string;
  data?: {
    station_id: string;
    station_imei: string;
    action_type: string;
    wifi_ssid: string;
    message: string;
    iot_history_id: string;
  };
  error?: {
    code: string;
    message: string;
    context?: any;
  };
}

export interface EjectRequest {
  slot_number: number;
}

export interface EjectPowerbankRequest {
  station_id: string;
  powerbank_sn?: string;
  reason?: string;
}

export interface EjectPowerbankResponse {
  success: boolean;
  message?: string;
  error?: {
    code: string;
    message: string;
    context?: {
      iot_history_id: string;
    };
  };
  data?: {
    iot_history_id: string;
    station_id: string;
    powerbank_sn?: string;
    message: string;
  };
}

export interface RebootStationRequest {
  station_id: string;
}

export interface RebootStationResponse {
  success: boolean;
  message: string;
  data: {
    station_id: string;
    station_imei: string;
    action_type: string;
    is_successful: boolean;
    message: string;
    iot_history_id: string;
  };
}

export interface StationCheckRequest {
  station_id: string;
  include_empty?: boolean;
  checkAll?: boolean;
}

export interface StationCheckSlot {
  index: number;
  pinboard_index: number;
  status: number;
  power: number;
  temp: number;
  voltage: number;
  current: number;
  sn_as_int: number;
  sn_as_string: string;
  area: number;
  soft_version: number;
  hard_version: number;
  message: string;
  locked: boolean;
  lock_count: number;
  putaway: boolean;
  micro_switch: string;
  solenoid_valve_switch: string;
  battery_vol: number;
}

export interface StationCheckResponse {
  success: boolean;
  message: string;
  data: {
    station_id: string;
    station_imei: string;
    action_type: string;
    slots: StationCheckSlot[];
    message: string;
    iot_history_id: string;
  };
}

export interface SetNetworkModeRequest {
  station_id: string;
  mode: 'wifi' | '4g';
}

export interface SetNetworkModeResponse {
  success: boolean;
  message: string;
  data: {
    station_id: string;
    station_imei: string;
    action_type: string;
    mode: string;
    message: string;
    iot_history_id: string;
  };
}

export interface SetVolumeRequest {
  station_id: string;
  volume: number;
}

export interface SetVolumeResponse {
  success: boolean;
  message: string;
  data: {
    station_id: string;
    station_imei: string;
    action_type: string;
    volume: number;
    message: string;
    iot_history_id: string;
  };
}
