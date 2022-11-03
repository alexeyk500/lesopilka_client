import { instanceAxios } from './instanceAxios';
import { CategoryType } from '../types/types';

export const productApi = {
  async getProduct(id: number) {
    const response = await instanceAxios.get<CategoryType[]>(`/product/${id}`);
    return response.data;
  },
};
