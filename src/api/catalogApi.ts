import { instanceAxios, setAuthHeader } from './instanceAxios';
import { CategorySizeType, CategoryType, ProductMaterialType, SubCategoryType } from '../types/types';

export const catalogApi = {
  async getCategories() {
    const response = await instanceAxios.get<CategoryType[]>('/category/categories');
    return response.data;
  },

  async getSubCategories() {
    const response = await instanceAxios.get<SubCategoryType[]>('/category/sub_categories');
    return response.data;
  },

  async getProductMaterials(token: string) {
    const response = await instanceAxios.get<ProductMaterialType[]>('/product/materials', setAuthHeader(token));
    return response.data;
  },

  async getCategorySizes() {
    const response = await instanceAxios.get<CategorySizeType[]>('/category/sizes');
    return response.data;
  },
};
