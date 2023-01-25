import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { dateMonthShift } from '../utils/dateTimeFunctions';

type OrdersSliceType = {
  selectedOrderStatusId: number;
  dateFrom: string;
  dateTo: string;
};

const dateTo = dateMonthShift(new Date(), 1);
const dateFrom = dateMonthShift(new Date(), -4);

const initialState: OrdersSliceType = {
  selectedOrderStatusId: 0,
  dateFrom: dateFrom.toISOString(),
  dateTo: dateTo.toISOString(),
};

export const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState,
  reducers: {
    setSelectedOrderStatusId: (state, actions) => {
      state.selectedOrderStatusId = actions.payload;
    },
  },
});

export const { setSelectedOrderStatusId } = ordersSlice.actions;

export const selectorSelectedOrderStatusId = (state: RootState) => state.orders.selectedOrderStatusId;
export const selectorSelectedOrderDateFrom = (state: RootState) => state.orders.dateFrom;
export const selectorSelectedOrderDateTo = (state: RootState) => state.orders.dateTo;

export default ordersSlice.reducer;
