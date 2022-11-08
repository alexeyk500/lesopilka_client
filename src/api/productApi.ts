import { instanceAxios, setAuthHeader } from './instanceAxios';
import { ProductType } from '../types/types';
import { UpdateProductDataType } from '../store/productSlice';

export const productApi = {
  async getProduct(id: string) {
    const response = await instanceAxios.get<ProductType>(`/product/${id}`);
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

  async createProduct(token: string) {
    const response = await instanceAxios.post<ProductType>('/product', {}, setAuthHeader(token));
    return response.data;
  },

  async updateProduct(token: string, updateData: UpdateProductDataType) {
    console.log();
    const response = await instanceAxios.put<ProductType>(`/product`, updateData, setAuthHeader(token));
    return response.data;
  },
};
