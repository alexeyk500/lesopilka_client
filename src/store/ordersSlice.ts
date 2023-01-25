import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { dateMonthShift } from '../utils/dateTimeFunctions';
import { MAX_MONTH_SHIFT_FOR_ORDERS } from '../utils/constants';
import { serverApi } from '../api/serverApi';
import { GetOrderServerType } from '../api/serverResponseTypes';
import { GetOrdersType } from '../api/orderApi';

type OrdersSliceType = {
  selectedOrderStatusId: number;
  dateFrom: string;
  dateTo: string;
  orders: GetOrderServerType[];
  isLoading: boolean;
};

const dateFrom = dateMonthShift(new Date(), -4);
const dateTo = dateMonthShift(new Date(), MAX_MONTH_SHIFT_FOR_ORDERS);

const initialState: OrdersSliceType = {
  selectedOrderStatusId: 0,
  dateFrom: dateFrom.toISOString(),
  dateTo: dateTo.toISOString(),
  orders: [],
  isLoading: false,
};

export const getOrdersThunk = createAsyncThunk<GetOrderServerType[], GetOrdersType, { rejectValue: string }>(
  'user/getOrdersThunk',
  async (getOrdersParams, { rejectWithValue }) => {
    try {
      return await serverApi.getOrders(getOrdersParams);
    } catch (e) {
      return rejectWithValue('Ошибка получения списка заказов');
    }
  }
);

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
      .addMatcher(isAnyOf(getOrdersThunk.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(getOrdersThunk.rejected), (state) => {
        state.isLoading = false;
      });
  },
});

export const { setSelectedOrderStatusId, setDateFrom, setDateTo } = ordersSlice.actions;

export const selectorSelectedOrderStatusId = (state: RootState) => state.orders.selectedOrderStatusId;
export const selectorSelectedOrderDateFrom = (state: RootState) => state.orders.dateFrom;
export const selectorSelectedOrderDateTo = (state: RootState) => state.orders.dateTo;

export default ordersSlice.reducer;
