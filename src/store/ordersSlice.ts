import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { dateMonthShift, normalizeDate } from '../utils/dateTimeFunctions';
import { MAX_MONTH_SHIFT_FOR_USER_ORDERS, MIN_MONTH_SHIFT_FOR_USER_ORDERS} from '../utils/constants';
import { serverApi } from '../api/serverApi';
import { GetOrderServerType, UniversalServerResponseType } from '../api/serverResponseTypes';
import { GetOrdersParamsType } from '../api/orderApi';
import { OrderType } from '../types/types';

type OrdersSliceType = {
  selectedOrderStatusId: number;
  dateFrom: string;
  dateTo: string;
  orders: OrderType[];
  isLoading: boolean;
};

const dateFrom = normalizeDate(dateMonthShift(new Date(), MIN_MONTH_SHIFT_FOR_USER_ORDERS));
const dateTo = normalizeDate(dateMonthShift(new Date(), MAX_MONTH_SHIFT_FOR_USER_ORDERS));

const initialState: OrdersSliceType = {
  selectedOrderStatusId: 0,
  dateFrom: dateFrom.toISOString(),
  dateTo: dateTo.toISOString(),
  orders: [],
  isLoading: false,
};

export const getOrdersThunk = createAsyncThunk<GetOrderServerType[], GetOrdersParamsType, { rejectValue: string }>(
  'user/getOrdersThunk',
  async (getOrdersParams, { rejectWithValue }) => {
    try {
      return await serverApi.getOrders(getOrdersParams);
    } catch (e) {
      return rejectWithValue('Ошибка получения списка заказов');
    }
  }
);

export const cancelOrderByIdThunk = createAsyncThunk<
  UniversalServerResponseType,
  { orderId: number; token: string },
  { rejectValue: string }
>('user/cancelOrderById', async ({ orderId, token }, { rejectWithValue }) => {
  try {
    return await serverApi.cancelOrderById(orderId, token);
  } catch (e) {
    return rejectWithValue('Ошибка отмены заказа');
  }
});

export const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState,
  reducers: {
    setSelectedOrderStatusId: (state, actions) => {
      state.selectedOrderStatusId = actions.payload;
    },
    setDateFrom: (state, actions) => {
      state.dateFrom = actions.payload;
    },
    setDateTo: (state, actions) => {
      state.dateTo = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(cancelOrderByIdThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(isAnyOf(getOrdersThunk.pending, cancelOrderByIdThunk.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(getOrdersThunk.rejected, cancelOrderByIdThunk.rejected), (state) => {
        state.isLoading = false;
      });
  },
});

export const { setSelectedOrderStatusId, setDateFrom, setDateTo } = ordersSlice.actions;

export const selectorSelectedOrderStatusId = (state: RootState) => state.orders.selectedOrderStatusId;
export const selectorSelectedOrderDateFrom = (state: RootState) => state.orders.dateFrom;
export const selectorSelectedOrderDateTo = (state: RootState) => state.orders.dateTo;
export const selectorOrders = (state: RootState) => state.orders.orders;

export default ordersSlice.reducer;
