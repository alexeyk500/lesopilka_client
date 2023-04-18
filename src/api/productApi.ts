import { instanceAxios, setAuthHeader } from './instanceAxios';
import { ProductType } from '../types/types';
import { UpdateProductDataType } from '../store/productSlice';
import { DeleteResultServerType, GetProductsServerType } from './serverResponseTypes';

export const productApi = {
  async getProduct(id: number) {
    const response = await instanceAxios.get<ProductType>(`/product/${id}`);
    return response.data;
  },

  async getProducts(urlSearchParams: URLSearchParams | undefined) {
    const response = await instanceAxios.get<GetProductsServerType>(`/product/products/?${urlSearchParams}`);
    return response.data;
  },

  async createProduct(token: string) {
    const response = await instanceAxios.post<ProductType>('/product', {}, setAuthHeader(token));
    return response.data;
  },

  async updateProduct(token: string, updateData: UpdateProductDataType) {
    const response = await instanceAxios.put<ProductType>(`/product`, updateData, setAuthHeader(token));
    return response.data;
  },

  async updateProductDescription(token: string, updateData: UpdateProductDataType) {
    const response = await instanceAxios.put<ProductType>(`/product/description`, updateData, setAuthHeader(token));
    return response.data;
  },

  async uploadPictureToProduct(token: string, productId: number, img: File) {
    const formData = new FormData();
    formData.append('productId', String(productId));
    formData.append('img', img);
    const response = await instanceAxios.post<ProductType>(`/picture/product`, formData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async deletePicture(token: string, fileName: string) {
    const response = await instanceAxios.delete<DeleteResultServerType>(`/picture`, {
      data: { fileName },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async deleteProduct(token: string, productId: number) {
    const response = await instanceAxios.delete<DeleteResultServerType>(`/product`, {
      data: { productId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
