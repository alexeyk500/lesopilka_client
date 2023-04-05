import { OrderMessageType } from '../types/types';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { serverApi } from '../api/serverApi';
import { CreateOrderMessagesParamsType, GetOrderMessagesParamsType } from '../api/orderMessagesApi';
import { RootState } from './store';
import { UniversalServerType } from '../api/serverResponseTypes';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';

type OrderMessagesSliceType = {
  messages: OrderMessageType[];
  isLoading: boolean;
};

const initialState: OrderMessagesSliceType = {
  messages: [],
  isLoading: false,
};

export const getOrderMessagesThunk = createAsyncThunk<
  OrderMessageType[],
  GetOrderMessagesParamsType,
  { rejectValue: string }
>('orderMessages/getOrderMessagesThunk', async (getOrderMessagesParams, { rejectWithValue }) => {
  try {
    return await serverApi.getOrderMessages(getOrderMessagesParams);
  } catch (e) {
    return rejectWithValue('Ошибка получения сообщений по заказу');
  }
});

export const createOrderMessagesThunk = createAsyncThunk<
  UniversalServerType,
  CreateOrderMessagesParamsType,
  { rejectValue: string }
>('orderMessages/createOrderMessagesThunk', async (createOrderMessagesParams, { rejectWithValue }) => {
  try {
    return await serverApi.createOrderMessages(createOrderMessagesParams);
  } catch (e) {
    return rejectWithValue('Ошибка создания нового сообщения по заказу');
  }
});

export const orderMessagesSlice = createSlice({
  name: 'orderMessagesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderMessagesThunk.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isAnyOf(getOrderMessagesThunk.pending, createOrderMessagesThunk.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(getOrderMessagesThunk.rejected, createOrderMessagesThunk.rejected), (state, action) => {
        state.isLoading = false;
        showErrorPopUp(action.payload ? action.payload : 'Неизвестная ошибка - orderMessagesSlice');
      });
  },
});

export const selectorOrderMessages = (state: RootState) => state.orderMessages.messages;

export default orderMessagesSlice.reducer;
