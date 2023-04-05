import { instanceAxios, setAuthHeader } from './instanceAxios';
import { AddressType, CategoryType, ProductType, ServerOrderStatusType } from '../types/types';
import { GetOrderServerType, UniversalServerType } from './serverResponseTypes';
import { normalizeDate } from '../utils/dateTimeFunctions';

export type CreateNewOrderParamsType = {
  mid: number;
  deliveryDate: string;
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
  ordersStatus: ServerOrderStatusType | 'all' | 'inArchive' | 'active';
  token: string;
  isOrdersForManufacturer?: boolean;
};

export type ConfirmManufacturerOrdersParamsType = {
  orderId: number;
  deliveryPrice: number | null;
  requestProducts: { productId: number; amount: number }[];
  token: string;
};

export type ArchiveOrderParamsType = {
  orderId: number;
  isOrderForManufacturer?: boolean;
  token: string;
};

export type CancelOrderParamsType = ArchiveOrderParamsType;

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
    deliveryDate,
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
        deliveryDate: normalizeDate(deliveryDate),
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

  async getOrderByOrderId({ orderId, token }: { orderId: number; token: string }) {
    const response = await instanceAxios.get<GetOrderServerType>(`/orders/${orderId}`, setAuthHeader(token));
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
    const response = await instanceAxios.post<UniversalServerType>(
      '/orders/cancel_order_return_to_basket',
      { orderId },
      setAuthHeader(token)
    );
    return response.data;
  },

  async confirmManufacturerOrder({
    orderId,
    deliveryPrice,
    requestProducts,
    token,
  }: ConfirmManufacturerOrdersParamsType) {
    const response = await instanceAxios.post<ProductType[]>(
      '/orders/confirm',
      {
        orderId,
        deliveryPrice,
        requestProducts,
      },
      setAuthHeader(token)
    );
    return response.data;
  },

  async archiveOrder({ orderId, isOrderForManufacturer, token }: ArchiveOrderParamsType) {
    const response = await instanceAxios.post<UniversalServerType>(
      '/orders/archive',
      {
        orderId,
        isOrderForManufacturer,
      },
      setAuthHeader(token)
    );
    return response.data;
  },

  async cancelOrder({ orderId, isOrderForManufacturer, token }: CancelOrderParamsType) {
    const response = await instanceAxios.post<UniversalServerType>(
      '/orders/cancel',
      {
        orderId,
        isOrderForManufacturer,
      },
      setAuthHeader(token)
    );
    return response.data;
  },
};
