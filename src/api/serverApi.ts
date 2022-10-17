import { userApi } from './userApi';
import { catalogApi } from './catalogApi';
import { addressApi } from './addressApi';

export const serverApi = {
  ...userApi,
  ...catalogApi,
  ...addressApi,
};
