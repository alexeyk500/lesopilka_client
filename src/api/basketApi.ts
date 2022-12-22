import { instanceAxios, setAuthHeader } from './instanceAxios';
import { ProductType } from '../types/types';

export const basketApi = {
  async getBasketProducts(token: string) {
    const response = await instanceAxios.get<ProductType[]>(`/baskets`, setAuthHeader(token));
    return response.data;
  },
  async toggleProductForBasket(productId: number, token: string) {
    const response = await instanceAxios.post<ProductType[]>(`/baskets`, { productId }, setAuthHeader(token));
    return response.data;
  },
  async updateBasketProductAmount(productId: number, amount: number, token: string) {
    const response = await instanceAxios.put<ProductType[]>(`/baskets`, { productId, amount }, setAuthHeader(token));
    return response.data;
  },
};
