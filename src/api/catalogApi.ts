import { instanceAxios } from './instanceAxios';
import { CategorySizeType, CategoryType, ProductMaterialType, ProductSortsType, SubCategoryType } from '../types/types';

export const catalogApi = {
  async getCategories() {
    const response = await instanceAxios.get<CategoryType[]>('/category/categories');
    return response.data;
  },

  async getSubCategories() {
    const response = await instanceAxios.get<SubCategoryType[]>('/category/sub_categories');
    return response.data;
  },

  async getProductMaterials() {
    const response = await instanceAxios.get<ProductMaterialType[]>('/product/materials');
    return response.data;
  },

  async getCategorySizes() {
    const response = await instanceAxios.get<CategorySizeType[]>('/category/sizes');
    return response.data;
  },

  async getProductSorts() {
    const response = await instanceAxios.get<ProductSortsType[]>('/product/sorts');
    return response.data;
  },
};
