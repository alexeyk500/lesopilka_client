import { OrderType } from '../types/types';
import { dateMonthShift } from '../utils/dateTimeFunctions';

import { MAX_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS, MIN_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS } from '../utils/constants';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { GetOrderServerType } from '../api/serverResponseTypes';
import { GetOrdersParamsType } from '../api/orderApi';
import { serverApi } from '../api/serverApi';

type ManOrdersSliceType = {
  selectedManOrderStatusId: number;
  manOrderDateFrom: string;
  manOrderDateTo: string;
  manOrders: OrderType[];
  isLoading: boolean;
};

const manOrderDateFrom = dateMonthShift(new Date(), MIN_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS);
const manOrderDateTo = dateMonthShift(new Date(), MAX_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS);

const initialState: ManOrdersSliceType = {
  selectedManOrderStatusId: 0,
  manOrderDateFrom: manOrderDateFrom.toISOString(),
  manOrderDateTo: manOrderDateTo.toISOString(),
  manOrders: [],
  isLoading: false,
};

export const getManOrdersByParamsThunk = createAsyncThunk<
  GetOrderServerType[],
  GetOrdersParamsType,
  { rejectValue: string }
>('user/getManufacturerOrdersThunk', async (getOrdersParams, { rejectWithValue }) => {
  try {
    return await serverApi.getOrders(getOrdersParams);
  } catch (e) {
    return rejectWithValue('Ошибка получения списка заказов для производителя');
  }
});

export const manOrdersSlice = createSlice({
  name: 'manOrdersSlice',
  initialState,
  reducers: {
    setSelectedManOrderStatusId: (state, actions) => {
      state.selectedManOrderStatusId = actions.payload;
    },
    setManDateFrom: (state, actions) => {
      state.manOrderDateFrom = actions.payload;
    },
    setManDateTo: (state, actions) => {
      state.manOrderDateTo = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getManOrdersByParamsThunk.fulfilled, (state, action) => {
        state.manOrders = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isAnyOf(getManOrdersByParamsThunk.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(getManOrdersByParamsThunk.rejected), (state) => {
        state.isLoading = false;
      });
  },
});

export const { setSelectedManOrderStatusId, setManDateFrom, setManDateTo } = manOrdersSlice.actions;

export const selectorSelectedManOrderStatusId = (state: RootState) => state.manOrders.selectedManOrderStatusId;
export const selectorSelectedManOrderDateFrom = (state: RootState) => state.manOrders.manOrderDateFrom;
export const selectorSelectedManOrderDateTo = (state: RootState) => state.manOrders.manOrderDateTo;
export const selectorManOrders = (state: RootState) => state.manOrders.manOrders;

export default manOrdersSlice.reducer;
