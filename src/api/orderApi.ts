import { instanceAxios } from './instanceAxios';
import { AddressType, CategoryType } from '../types/types';

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
};
