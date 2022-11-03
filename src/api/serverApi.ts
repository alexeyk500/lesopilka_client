import { userApi } from './userApi';
import { catalogApi } from './catalogApi';
import { addressApi } from './addressApi';
import { productApi } from './productApi';

export const serverApi = {
  ...userApi,
  ...catalogApi,
  ...addressApi,
  ...productApi,
};
