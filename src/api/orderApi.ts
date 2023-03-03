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
  orderDateFrom: string;
  orderDateTo: string;
  ordersStatus: ServerOrderStatusType | 'all' | 'inArchive';
  token: string;
  isOrdersForManufacturer?: boolean;
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

  async getOrders({ orderDateFrom, orderDateTo, ordersStatus, token, isOrdersForManufacturer }: GetOrdersParamsType) {
    const response = await instanceAxios.post<GetOrderServerType[]>(
      '/orders',
      {
        orderDateFrom: normalizeDate(orderDateFrom),
        orderDateTo: normalizeDate(orderDateTo),
        ordersStatus,
        isOrdersForManufacturer,
      },
      setAuthHeader(token)
    );
    return response.data;
  },

  async returnToBasketAndCancelOrderById(orderId: number, token: string) {
    const response = await instanceAxios.post<UniversalServerResponseType>(
      '/orders/cancel_order_return_to_basket',
      { orderId },
      setAuthHeader(token)
    );
    return response.data;
  },
};
