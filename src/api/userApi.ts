import { instanceAxios, setAuthHeader } from './instanceAxios';
import { SendConfirmationEmailServerType, UserLoginServerType } from './serverResponseTypes';

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
    const response = await instanceAxios.post<SendConfirmationEmailServerType>('/user/send_confirmation_email', {
      email,
      password,
    });
    return response.data;
  },

  async sendRecoveryPasswordEmail(email: string) {
    const response = await instanceAxios.post<SendConfirmationEmailServerType>('/user/send_recovery_password_email', {
      email,
    });
    return response.data;
  },

  async sendConfirmedRecoveryPasswordCode(code: string, password: string) {
    const response = await instanceAxios.post<SendConfirmationEmailServerType>('/user/confirm_recovery_password_code', {
      code,
      password,
    });
    return response.data;
  },

  async updateUserNameOrPassword(token: string, name?: string, password?: string) {
    const response = await instanceAxios.put<UserLoginServerType>(
      '/user/update_user',
      {
        name,
        password,
      },
      setAuthHeader(token)
    );
    return response.data;
  },
};
