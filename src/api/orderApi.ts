import { instanceAxios, setAuthHeader } from './instanceAxios';
import { AddressType, CategoryType } from '../types/types';
import { GetOrderServerType } from './serverResponseTypes';

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

export const orderApi = {
  async getPaymentMethods() {
    const response = await instanceAxios.get<CategoryType[]>('/order/payment_methods');
    return response.data;
  },

  async getDeliveryMethods() {
    const response = await instanceAxios.get<CategoryType[]>('/order/delivery_methods');
    return response.data;
  },

  async getManufacturerPickUpAddress(mid: number) {
    const response = await instanceAxios.get<{ address: AddressType }>(`/order/pick_up_address/${mid}`);
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
      `/order`,
      {
        mid,
        date,
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
};
