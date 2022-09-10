import { instanceAxios, setAuthHeader } from './instanceAxios';
import { CheckTokenServerType, SendConfirmationEmailServerType } from './serverResponseTypes';

export const userApi = {
  async checkToken(token: string) {
    const response = await instanceAxios.get<CheckTokenServerType>('/user/auth', setAuthHeader(token));
    return response.data;
  },

  async sendConfirmationEmail(email: string, password: string) {
    const response = await instanceAxios.post<SendConfirmationEmailServerType>('/user/user/send_confirmation_email', {
      email,
      password,
    });
    return response.data;
  },
};
