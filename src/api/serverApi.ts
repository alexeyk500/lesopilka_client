import { userApi } from './userApi';
import { catalogApi } from './catalogApi';
import { addressApi } from './addressApi';
import { productApi } from './productApi';
import { priceApi } from './priceApi';

export const serverApi = {
  ...userApi,
  ...catalogApi,
  ...addressApi,
  ...productApi,
  ...priceApi,
};
