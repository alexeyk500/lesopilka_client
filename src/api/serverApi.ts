import { userApi } from './userApi';
import { catalogApi } from './catalogApi';
import { addressApi } from './addressApi';
import { productApi } from './productApi';
import { priceApi } from './priceApi';
import { basketApi } from './basketApi';
import { orderApi } from './orderApi';
import { orderMessagesApi } from './orderMessagesApi';
import { licensesApi } from './licensesApi';
import { favoriteApi } from './favoriteApi';
import { resellerApi } from './resellerApi';

export const serverApi = {
  ...userApi,
  ...catalogApi,
  ...addressApi,
  ...productApi,
  ...priceApi,
  ...basketApi,
  ...orderApi,
  ...orderMessagesApi,
  ...licensesApi,
  ...favoriteApi,
  ...resellerApi,
};
