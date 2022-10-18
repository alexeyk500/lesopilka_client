import { instanceAxios } from './instanceAxios';
import { LocationType, RegionType } from '../types/types';

export const addressApi = {
  async getRegions() {
    const response = await instanceAxios.get<RegionType[]>('/address/regions');
    return response.data;
  },

  async getLocationsByRegionId(regionId: number) {
    const response = await instanceAxios.get<LocationType[]>(`/address/locations/${regionId}`);
    return response.data;
  },
};
