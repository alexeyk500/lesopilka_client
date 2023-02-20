import { OrderType } from '../types/types';
import { dateMonthShift } from '../utils/dateTimeFunctions';

import { MAX_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS, MIN_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS } from '../utils/constants';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

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
      state.manOrderDateFrom = actions.payload;
    },
  },
});

export const { setSelectedManOrderStatusId, setManDateFrom, setManDateTo } = manOrdersSlice.actions;

export const selectorSelectedManOrderStatusId = (state: RootState) => state.manOrders.selectedManOrderStatusId;
export const selectorSelectedManOrderDateFrom = (state: RootState) => state.manOrders.manOrderDateFrom;
export const selectorSelectedManOrderDateTo = (state: RootState) => state.manOrders.manOrderDateTo;

export default manOrdersSlice.reducer;
