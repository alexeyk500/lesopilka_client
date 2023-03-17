import { instanceAxios, setAuthHeader } from './instanceAxios';
import { OrderMessageType } from '../types/types';

export type GetOrderMessagesParamsType = {
  orderId: number;
  token: string;
};

export const orderMessagesApi = {
  async getOrderMessages({ orderId, token }: GetOrderMessagesParamsType) {
    const response = await instanceAxios.get<OrderMessageType[]>(`order_message/${orderId}`, setAuthHeader(token));
    return response.data;
  },
};
