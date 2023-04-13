import { instanceAxios, setAuthHeader } from './instanceAxios';
import { CreateManufacturerServerType, UniversalServerType, UserLoginServerType } from './serverResponseTypes';
import { CreateManufacturerParamsType, UserUpdateParamsType } from '../types/types';

export const userApi = {
  async userLoginByPassword(email: string, password: string) {
    const response = await instanceAxios.post<UserLoginServerType>('/user/login', {
      email,
      password,
    });
    return response.data;
  },

  async userLoginByToken(token: string) {
    const response = await instanceAxios.get<UserLoginServerType>('/user/get-user', setAuthHeader(token));
    return response.data;
  },

  async createUserCandidate(email: string, password: string) {
    const response = await instanceAxios.post<UniversalServerType>('/user/create-user-candidate', {
      email,
      password,
    });
    return response.data;
  },

  async sendRecoveryPasswordEmail(email: string) {
    const response = await instanceAxios.post<UniversalServerType>('/user/send-recovery-password-email', {
      email,
    });
    return response.data;
  },

  async sendConfirmedRecoveryPasswordCode(code: string, password: string) {
    const response = await instanceAxios.post<UniversalServerType>('/user/confirm-recovery-password-code', {
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

  async activateCandidateUser(code: string) {
    const response = await instanceAxios.post<UserLoginServerType>('/activation/activate-user-candidate', {
      code,
    });
    return response.data;
  },
};
