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

  async updateUser(userUpdateParams: UserUpdateParamsType) {
    const { token, ...userParams } = userUpdateParams;
    const response = await instanceAxios.put<UserLoginServerType>('/user', userParams, setAuthHeader(token));
    return response.data;
  },

  async createManufacturer(createManufacturerParams: CreateManufacturerParamsType) {
    const { token, ...manufacturerParams } = createManufacturerParams;
    const response = await instanceAxios.post<CreateManufacturerServerType>(
      '/manufacturer',
      manufacturerParams,
      setAuthHeader(token)
    );
    return response.data;
  },

  async createReseller(createResellerParams: CreateResellerParamsType) {
    const { token, ...resellerParams } = createResellerParams;
    const response = await instanceAxios.post<UserLoginServerType>('/reseller', resellerParams, setAuthHeader(token));
    return response.data;
  },
};
