import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import catalogReducer from './catalogSlice';
import addressReducer from './addressSlice';
import productsReducer from './productSlice';
import priceReducer from './priceSlice';
import basketReducer from './basketSlice';
import newOrderReducer from './newOrderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    catalog: catalogReducer,
    address: addressReducer,
    products: productsReducer,
    price: priceReducer,
    basket: basketReducer,
    newOrder: newOrderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
