import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import catalogReducer from './catalogSlice';
import newCardReducer from './newCardSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    catalog: catalogReducer,
    newCard: newCardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
