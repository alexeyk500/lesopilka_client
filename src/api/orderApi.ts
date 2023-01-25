import { instanceAxios, setAuthHeader } from './instanceAxios';
import { AddressType, CategoryType } from '../types/types';
import { GetOrderServerType } from './serverResponseTypes';
import { normalizeData } from '../utils/dateTimeFunctions';

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

export type GetOrdersType = {
  dateFrom: string;
  dateTo: string;
  ordersStatus: string;
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
        date: normalizeData(date),
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

  async getOrders({ dateFrom, dateTo, ordersStatus, token }: GetOrdersType) {
    const response = await instanceAxios.post<GetOrderServerType[]>(
      '/orders',
      { dateFrom: normalizeData(dateFrom), dateTo: normalizeData(dateTo), ordersStatus },
      setAuthHeader(token)
    );
    return response.data;
  },
};
