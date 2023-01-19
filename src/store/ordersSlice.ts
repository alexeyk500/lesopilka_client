import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type OrdersSliceType = {
  selectedOrderStatusId: number;
  dateFrom: string;
  dateTo: string;
};

let nowDateTo = new Date();
const dateTo = new Date(nowDateTo.setMonth(nowDateTo.getMonth() + 1));
let nowDateFrom = new Date();
const dateFrom = new Date(nowDateFrom.setMonth(nowDateFrom.getMonth() - 4));

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
