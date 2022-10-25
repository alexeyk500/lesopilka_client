import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import catalogReducer from './catalogSlice';
import newCardReducer from './newCardSlice';
import addressReducer from './addressSlice';
import productsReducer from './productSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    catalog: catalogReducer,
    newCard: newCardReducer,
    address: addressReducer,
    products: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
