import { CreateCandidateManufacturerParamsType, CreateResellerParamsType, ManufacturerType } from '../types/types';
import { instanceAxios, setAuthHeader } from './instanceAxios';
import { UniversalServerType, UserLoginServerType } from './serverResponseTypes';

export const resellerApi = {
  async createReseller(createResellerParams: CreateResellerParamsType) {
    const { token, ...resellerParams } = createResellerParams;
    const response = await instanceAxios.post<UserLoginServerType>(
      '/reseller/create',
      resellerParams,
      setAuthHeader(token)
    );
    return response.data;
  },

  async createCandidateManufacturer(createCandidateManufacturerParams: CreateCandidateManufacturerParamsType) {
    const { token, ...candidateManufacturerParams } = createCandidateManufacturerParams;
    const response = await instanceAxios.post<UniversalServerType>(
      '/reseller/create-reseller-manufacturer-candidate',
      candidateManufacturerParams,
      setAuthHeader(token)
    );
    return response.data;
  },

  async activateCandidateManufacturer(code: string) {
    const response = await instanceAxios.post<UserLoginServerType>(
      '/activation/activate-reseller-manufacturer-candidate',
      { code }
    );
    return response.data;
  },

  async getResellerManufacturers(token: string) {
    const response = await instanceAxios.get<ManufacturerType[]>(
      '/reseller/reseller-manufacturers-list',
      setAuthHeader(token)
    );
    return response.data;
  },

  async unregisterResellerManufacturer({ manufacturerId, token }: { manufacturerId: number; token: string }) {
    const response = await instanceAxios.post<ManufacturerType[]>(
      '/reseller/unregister-reseller-manufacturer',
      { manufacturerId },
      setAuthHeader(token)
    );
    return response.data;
  },
};
