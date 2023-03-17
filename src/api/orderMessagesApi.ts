import { instanceAxios, setAuthHeader } from './instanceAxios';
import { OrderMessageType } from '../types/types';
import { UniversalServerResponseType } from './serverResponseTypes';

export type GetOrderMessagesParamsType = {
  orderId: number;
  token: string;
};

export type CreateOrderMessagesParamsType = {
  orderId: number;
  isManufacturerMessage: boolean;
  messageText: string;
  token: string;
};

export const orderMessagesApi = {
  async getOrderMessages({ orderId, token }: GetOrderMessagesParamsType) {
    const response = await instanceAxios.get<OrderMessageType[]>(`order_message/${orderId}`, setAuthHeader(token));
    return response.data;
  },

  async createOrderMessages({ orderId, isManufacturerMessage, messageText, token }: CreateOrderMessagesParamsType) {
    const response = await instanceAxios.post<UniversalServerResponseType>(
      `order_message/`,
      { orderId, isManufacturerMessage, messageText },
      setAuthHeader(token)
    );
    return response.data;
  },
};
