import { OrderType } from '../types/types';
import { dateMonthShift } from '../utils/dateTimeFunctions';

import { MAX_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS, MIN_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS } from '../utils/constants';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type ManOrdersSliceType = {
  selectedOrderStatusId: number;
  manOrderDateFrom: string;
  manOrderDateTo: string;
  manOrders: OrderType[];
  isLoading: boolean;
};

const manOrderDateFrom = dateMonthShift(new Date(), MIN_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS);
const manOrderDateTo = dateMonthShift(new Date(), MAX_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS);

const initialState: ManOrdersSliceType = {
  selectedOrderStatusId: 0,
  manOrderDateFrom: manOrderDateFrom.toISOString(),
  manOrderDateTo: manOrderDateTo.toISOString(),
  manOrders: [],
  isLoading: false,
};

export const manOrdersSlice = createSlice({
  name: 'manOrdersSlice',
  initialState,
  reducers: {
    setManDateFrom: (state, actions) => {
      state.manOrderDateFrom = actions.payload;
    },
    setManDateTo: (state, actions) => {
      state.manOrderDateFrom = actions.payload;
    },
  },
});

export const { setManDateFrom, setManDateTo } = manOrdersSlice.actions;

export const selectorSelectedManOrderDateFrom = (state: RootState) => state.manOrders.manOrderDateFrom;
export const selectorSelectedManOrderDateTo = (state: RootState) => state.manOrders.manOrderDateTo;

export default manOrdersSlice.reducer;
