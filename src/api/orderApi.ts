import { instanceAxios, setAuthHeader } from './instanceAxios';
import { AddressType, CategoryType, ServerOrderStatusType } from '../types/types';
import { GetOrderServerType, UniversalServerResponseType } from './serverResponseTypes';
import { normalizeDate } from '../utils/dateTimeFunctions';

export type CreateNewOrderParamsType = {
  mid: number;
  date: string;
  contactPersonName: string;
  contactPersonPhone: string;
  deliveryAddress: string | undefined;
  locationId: number | undefined;
  paymentMethodId: number;
  deliveryMethodId: number;
  token: string;
};

export type GetOrdersParamsType = {
  dateFrom: string;
  dateTo: string;
  ordersStatus: ServerOrderStatusType | 'all';
  token: string;
};

export const orderApi = {
  async getPaymentMethods() {
    const response = await instanceAxios.get<CategoryType[]>('/orders/payment_methods');
    return response.data;
  },

  async getDeliveryMethods() {
    const response = await instanceAxios.get<CategoryType[]>('/orders/delivery_methods');
    return response.data;
  },

  async getManufacturerPickUpAddress(mid: number) {
    const response = await instanceAxios.get<{ address: AddressType }>(`/orders/pick_up_address/${mid}`);
    return response.data;
  },

  async createNewOrder({
    mid,
    date,
    contactPersonName,
    contactPersonPhone,
    deliveryAddress,
    locationId,
    paymentMethodId,
    deliveryMethodId,
    token,
  }: CreateNewOrderParamsType) {
    const response = await instanceAxios.post<GetOrderServerType[]>(
      `/orders/new_order`,
      {
        mid,
        date: normalizeDate(date),
        contactPersonName,
        contactPersonPhone,
        deliveryAddress,
        locationId,
        paymentMethodId,
        deliveryMethodId,
      },
      setAuthHeader(token)
    );
    return response.data;
  },

  async getOrders({ dateFrom, dateTo, ordersStatus, token }: GetOrdersParamsType) {
    const response = await instanceAxios.post<GetOrderServerType[]>(
      '/orders',
      { dateFrom: normalizeDate(dateFrom), dateTo: normalizeDate(dateTo), ordersStatus },
      setAuthHeader(token)
    );
    return response.data;
  },

  async cancelOrderById(orderId: number, token: string) {
    const response = await instanceAxios.post<UniversalServerResponseType>(
      '/orders/cancel_order',
      { orderId },
      setAuthHeader(token)
    );
    return response.data;
  },
};
