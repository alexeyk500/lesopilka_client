import { instanceAxios, setAuthHeader } from './instanceAxios';
import { ProductType } from '../types/types';
import { UniversalServerType } from './serverResponseTypes';

export const favoriteApi = {
  async getFavoriteProducts(token: string) {
    const response = await instanceAxios.get<ProductType[]>(`/favorite`, setAuthHeader(token));
    return response.data;
  },

  async createFavoriteProduct(productId: number, token: string) {
    const response = await instanceAxios.post<UniversalServerType>(`/favorite`, { productId }, setAuthHeader(token));
    return response.data;
  },

  async deleteFavoriteProduct(productId: number, token: string) {
    const response = await instanceAxios.delete<UniversalServerType>(`/favorite`, {
      data: { productId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
