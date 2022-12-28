import { DeliveryMethodEnum, PaymentMethodEnum } from '../types/types';
import { addDays } from '../utils/functions';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type NewOrderSliceType = {
  manufacturerId: number | undefined;
  date: string;
  deliveryMethod: DeliveryMethodEnum;
  deliveryLocationId: number | undefined;
  deliveryAddress: string | undefined;
  contactPersonName: string | undefined;
  contactPersonPhone: string | undefined;
  paymentMethod: PaymentMethodEnum;
};

const initialState: NewOrderSliceType = {
  manufacturerId: undefined,
  date: addDays(new Date(), 1),
  deliveryMethod: DeliveryMethodEnum.pickup,
  deliveryLocationId: undefined,
  deliveryAddress: undefined,
  contactPersonName: undefined,
  contactPersonPhone: undefined,
  paymentMethod: PaymentMethodEnum.bank,
};

export const newOrderSlice = createSlice({
  name: 'newOrderSlice',
  initialState,
  reducers: {
    setManufacturerId: (state, actions) => {
      state.manufacturerId = actions.payload;
    },
    setDate: (state, actions) => {
      state.date = actions.payload;
    },
  },
});

export const { setManufacturerId, setDate } = newOrderSlice.actions;

export const selectorNewOrderDate = (state: RootState) => state.newOrder.date;
export const selectorNewOrderManufacturerId = (state: RootState) => state.newOrder.manufacturerId;

export default newOrderSlice.reducer;
