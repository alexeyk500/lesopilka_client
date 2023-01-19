import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type OrdersSliceType = {
  selectedOrderStatusId: number;
};

const initialState: OrdersSliceType = {
  selectedOrderStatusId: 0,
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

export default ordersSlice.reducer;
