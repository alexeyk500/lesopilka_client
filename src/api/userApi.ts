import { instanceAxios, setAuthHeader } from './instanceAxios';
import { CreateManufacturerServerType, UniversalServerType, UserLoginServerType } from './serverResponseTypes';
import { CreateManufacturerParamsType, CreateResellerParamsType, UserUpdateParamsType } from '../types/types';

export const userApi = {
  async userLoginByPassword(email: string, password: string) {
    const response = await instanceAxios.post<UserLoginServerType>('/user/login', {
      email,
      password,
    });
    return response.data;
  },

  async userLoginByToken(token: string) {
    const response = await instanceAxios.get<UserLoginServerType>('/user/get_user', setAuthHeader(token));
    return response.data;
  },

  async sendConfirmationEmail(email: string, password: string) {
    const response = await instanceAxios.post<UniversalServerType>('/user/send_confirmation_email', {
      email,
      password,
    });
    return response.data;
  },

  async sendRecoveryPasswordEmail(email: string) {
    const response = await instanceAxios.post<UniversalServerType>('/user/send_recovery_password_email', {
      email,
    });
    return response.data;
  },

  async sendConfirmedRecoveryPasswordCode(code: string, password: string) {
    const response = await instanceAxios.post<UniversalServerType>('/user/confirm_recovery_password_code', {
      code,
      password,
    });
    return response.data;
  },

  async updateUser({ token, name, phone, password, searchRegionId, searchLocationId }: UserUpdateParamsType) {
    const response = await instanceAxios.put<UserLoginServerType>(
      '/user',
      {
        name,
        phone,
        password,
        searchRegionId,
        searchLocationId,
      },
      setAuthHeader(token)
    );
    return response.data;
  },

  async createManufacturer({
    inn,
    title,
    phone,
    locationId,
    street,
    building,
    office,
    postIndex,
    token,
  }: CreateManufacturerParamsType) {
    const response = await instanceAxios.post<CreateManufacturerServerType>(
      '/manufacturer',
      {
        inn,
        title,
        phone,
        locationId,
        street,
        building,
        office,
        postIndex,
      },
      setAuthHeader(token)
    );
    return response.data;
  },

  // async createReseller({ family, name, middleName, phone, locationId, token }: CreateResellerParamsType) {
  //   const response = await instanceAxios.post<UserLoginServerType>(
  //     '/reseller',
  //     { family, name, middleName, phone, locationId },
  //     setAuthHeader(token)
  //   );
  //   return response.data;
  // },

  async createReseller(createResellerParams: CreateResellerParamsType) {
    const { token, ...resellerParams } = createResellerParams;
    const response = await instanceAxios.post<UserLoginServerType>('/reseller', resellerParams, setAuthHeader(token));
    return response.data;
  },
};
