import { instanceAxios, setAuthHeader } from './instanceAxios';
import { LicenceAction } from '../types/types';
import { GetManufacturerLicensesInfoType } from './serverResponseTypes';

export type getManufacturerLicensesActionsParamsType = {
  dateFrom: string;
  dateTo: string;
  token: string;
};

export const licensesApi = {
  async getManufacturerLicensesActions({ dateFrom, dateTo, token }: getManufacturerLicensesActionsParamsType) {
    const response = await instanceAxios.post<LicenceAction[]>(
      `/licenses/manufacturer-license-actions`,
      { dateFrom, dateTo },
      setAuthHeader(token)
    );
    return response.data;
  },

  async getManufacturerLicensesInfo(token: string) {
    const response = await instanceAxios.get<GetManufacturerLicensesInfoType>(`/licenses`, setAuthHeader(token));
    return response.data;
  },
};
