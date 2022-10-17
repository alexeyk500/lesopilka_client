import { instanceAxios } from './instanceAxios';
import { CategoryType } from '../types/types';

export const addressApi = {
  async getRegions() {
    const response = await instanceAxios.get<CategoryType[]>('/address/regions');
    return response.data;
  },

  async getLocationsByRegionId(regionId: number) {
    const response = await instanceAxios.get<CategoryType[]>(`/address/locations/${regionId}`);
    return response.data;
  },
};
