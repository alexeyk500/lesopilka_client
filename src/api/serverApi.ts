import { userApi } from './userApi';
import { catalogApi } from './catalogApi';

export const serverApi = {
  ...userApi,
  ...catalogApi,
};
