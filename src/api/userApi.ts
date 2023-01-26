import { instanceAxios, setAuthHeader } from './instanceAxios';
import { CreateManufacturerType, UniversalServerResponseType, UserLoginServerType } from './serverResponseTypes';

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
    const response = await instanceAxios.post<UniversalServerResponseType>('/user/send_confirmation_email', {
      email,
      password,
    });
    return response.data;
  },

  async sendRecoveryPasswordEmail(email: string) {
    const response = await instanceAxios.post<UniversalServerResponseType>('/user/send_recovery_password_email', {
      email,
    });
    return response.data;
  },

  async sendConfirmedRecoveryPasswordCode(code: string, password: string) {
    const response = await instanceAxios.post<UniversalServerResponseType>('/user/confirm_recovery_password_code', {
      code,
      password,
    });
    return response.data;
  },

  async updateUser(
    token: string,
    name?: string,
    phone?: string | null,
    password?: string,
    searchRegionId?: number | null,
    searchLocationId?: number | null
  ) {
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

  async createManufacturer(
    token: string,
    inn: string,
    title: string,
    phone: string,
    locationId: number,
    street: string,
    building: string,
    office: string | undefined,
    postIndex: string
  ) {
    const response = await instanceAxios.post<CreateManufacturerType>(
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
};
