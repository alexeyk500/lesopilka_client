import { instanceAxios } from './instanceAxios';
import { CategoryType, SubCategoryType } from '../types/types';

export const catalogApi = {
  async getCategories() {
    const response = await instanceAxios.get<CategoryType[]>('/category/categories');
    return response.data;
  },
  async getSubCategories() {
    const response = await instanceAxios.get<SubCategoryType[]>('/category/sub_categories');
    return response.data;
  },
};
