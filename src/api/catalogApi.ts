import { instanceAxios } from './instanceAxios';
import { CategoryType } from '../types/types';

export const catalogApi = {
  async getCategories() {
    const response = await instanceAxios.get<CategoryType[]>('/category/categories');
    return response.data;
  },
};
