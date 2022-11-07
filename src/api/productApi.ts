import { instanceAxios } from './instanceAxios';
import { CategoryType, ProductType } from '../types/types';

export const productApi = {
  async getProduct(id: number) {
    const response = await instanceAxios.get<CategoryType[]>(`/product/${id}`);
    return response.data;
  },

  async getProducts(manufacturerId?: number) {
    let query: string | undefined;
    if (manufacturerId) {
      query += `?mid=${manufacturerId}`;
    }
    const response = await instanceAxios.get<ProductType[]>(`/product/products/${query ? query : ''}`);
    return response.data;
  },
};
