import { apiClient } from '../api-client';
import type {
  StationDetail, WifiNetwork, WifiConnectRequest,
  EjectRequest, StationListResponse, StationListParams, StationDetailResponse,
  StationCheckRequest, StationCheckResponse, EjectPowerbankRequest, EjectPowerbankResponse,
  WifiScanRequest, WifiScanResponse, WifiConnectRequestNew, WifiConnectResponse,
  RebootStationRequest, RebootStationResponse, SetNetworkModeRequest, SetNetworkModeResponse,
  SetVolumeRequest, SetVolumeResponse,
} from '../types';

export const stationService = {
  async getStations(params?: StationListParams): Promise<StationListResponse> {
    return apiClient<StationListResponse>('/partner/stations', { params });
  },

  async getStationById(id: string): Promise<StationDetailResponse> {
    return apiClient<StationDetailResponse>(`/partner/stations/${id}`);
  },

  async checkStation(request: StationCheckRequest): Promise<StationCheckResponse> {
    const formData = new FormData();
    formData.append('station_id', request.station_id);
    if (request.include_empty !== undefined) {
      formData.append('include_empty', String(request.include_empty));
    }
    if (request.checkAll !== undefined) {
      formData.append('checkAll', String(request.checkAll));
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/internal/iot/check`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to check station');
    }

    return response.json();
  },

  async ejectPowerbank(request: EjectPowerbankRequest): Promise<EjectPowerbankResponse> {
    const formData = new FormData();
    formData.append('station_id', request.station_id);
    if (request.powerbank_sn) {
      formData.append('powerbank_sn', request.powerbank_sn);
    }
    if (request.reason) {
      formData.append('reason', request.reason);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/internal/iot/eject`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to eject powerbank');
    }

    return data;
  },

  async scanWifi(request: WifiScanRequest): Promise<WifiScanResponse> {
    const formData = new FormData();
    formData.append('station_id', request.station_id);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/internal/iot/wifi/scan`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to scan WiFi networks');
    }

    return data;
  },

  async connectWifiNew(request: WifiConnectRequestNew): Promise<WifiConnectResponse> {
    const formData = new FormData();
    formData.append('station_id', request.station_id);
    formData.append('wifi_ssid', request.wifi_ssid);
    if (request.wifi_password) {
      formData.append('wifi_password', request.wifi_password);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/internal/iot/wifi/connect`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to connect to WiFi');
    }

    return data;
  },

  async rebootStationNew(request: RebootStationRequest): Promise<RebootStationResponse> {
    const formData = new FormData();
    formData.append('station_id', request.station_id);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/internal/iot/reboot`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to reboot station');
    }

    return data;
  },

  async setNetworkMode(request: SetNetworkModeRequest): Promise<SetNetworkModeResponse> {
    const formData = new FormData();
    formData.append('station_id', request.station_id);
    formData.append('mode', request.mode);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/internal/iot/mode`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to set network mode');
    }

    return data;
  },

  async setVolume(request: SetVolumeRequest): Promise<SetVolumeResponse> {
    const formData = new FormData();
    formData.append('station_id', request.station_id);
    formData.append('volume', String(request.volume));

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/internal/iot/volume`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to set volume');
    }

    return data;
  },

  async ejectPowerbankOld(stationId: string, request: EjectRequest): Promise<void> {
    return apiClient(`/stations/${stationId}/eject`, { method: 'POST', body: request });
  },

  async rebootStation(stationId: string): Promise<void> {
    return apiClient(`/stations/${stationId}/reboot`, { method: 'POST' });
  },

  async scanWifiOld(stationId: string): Promise<WifiNetwork[]> {
    return apiClient<WifiNetwork[]>(`/stations/${stationId}/wifi/scan`, { method: 'POST' });
  },

  async connectWifi(stationId: string, config: WifiConnectRequest): Promise<void> {
    return apiClient(`/stations/${stationId}/wifi/connect`, { method: 'POST', body: config });
  },
};

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )access_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}
