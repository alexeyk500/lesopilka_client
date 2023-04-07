import { CreateCandidateManufacturerParamsType, CreateResellerParamsType } from '../types/types';
import { instanceAxios, setAuthHeader } from './instanceAxios';
import { UniversalServerType, UserLoginServerType } from './serverResponseTypes';

export const resellerApi = {
  async createReseller(createResellerParams: CreateResellerParamsType) {
    const { token, ...resellerParams } = createResellerParams;
    const response = await instanceAxios.post<UserLoginServerType>('/reseller', resellerParams, setAuthHeader(token));
    return response.data;
  },

  async createCandidateManufacturer(createCandidateManufacturerParams: CreateCandidateManufacturerParamsType) {
    const { token, ...candidateManufacturerParams } = createCandidateManufacturerParams;
    const response = await instanceAxios.post<UniversalServerType>(
      '/reseller/manufacturer-candidate',
      candidateManufacturerParams,
      setAuthHeader(token)
    );
    return response.data;
  },
};
