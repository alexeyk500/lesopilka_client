import { OrderInfoType, ProductType, UserType } from '../types/types';

export type UserLoginServerType = {
  user: UserType;
  token: string;
};

export type CreateManufacturerType = {
  id: number;
  userId: number;
  title: string;
  inn: string;
  phone: string;
  addressId: number;
  approved: boolean;
};

export type DeleteResultType = {
  fileName: string;
  result: number;
};

export type GetProductsServerType = {
  products: ProductType[];
  totalProducts: number;
  pageSize: number;
  totalPages: number;
  currentPage: number;
};

export type GetOrderServerType = {
  order: OrderInfoType;
  products: ProductType[];
};

export type UniversalServerResponseType = {
  message: string;
};
