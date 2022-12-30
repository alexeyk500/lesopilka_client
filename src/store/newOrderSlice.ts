import { DeliveryMethodEnum, OptionsType, PaymentMethodEnum } from '../types/types';
import { addDays } from '../utils/functions';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type NewOrderSliceType = {
  date: string;
  deliveryMethod: DeliveryMethodEnum;
  deliveryLocation: OptionsType | undefined;
  deliveryAddress: string | undefined;
  contactPersonName: string | undefined;
  contactPersonPhone: string | undefined;
  paymentMethod: PaymentMethodEnum;
};

const initialState: NewOrderSliceType = {
  date: addDays(new Date(), 1),
  deliveryMethod: DeliveryMethodEnum.pickup,
  deliveryLocation: undefined,
  deliveryAddress: undefined,
  contactPersonName: undefined,
  contactPersonPhone: undefined,
  paymentMethod: PaymentMethodEnum.transferToAccount,
};

export const newOrderSlice = createSlice({
  name: 'newOrderSlice',
  initialState,
  reducers: {
    setDate: (state, actions) => {
      state.date = actions.payload;
    },
    setDeliveryMethod: (state, actions) => {
      state.deliveryMethod = actions.payload;
    },
    setPaymentMethod: (state, actions) => {
      state.paymentMethod = actions.payload;
    },
    setContactPersonName: (state, actions) => {
      state.contactPersonName = actions.payload;
    },
    setContactPersonPhone: (state, actions) => {
      state.contactPersonPhone = actions.payload;
    },
    setDeliveryLocation: (state, actions) => {
      state.deliveryLocation = actions.payload;
    },
    setDeliveryAddress: (state, actions) => {
      state.deliveryAddress = actions.payload;
    },
  },
});

export const {
  setDate,
  setDeliveryMethod,
  setPaymentMethod,
  setContactPersonName,
  setContactPersonPhone,
  setDeliveryLocation,
  setDeliveryAddress,
} = newOrderSlice.actions;

export const selectorNewOrderDate = (state: RootState) => state.newOrder.date;
export const selectorNewOrderDeliveryMethod = (state: RootState) => state.newOrder.deliveryMethod;
export const selectorNewOrderPaymentMethod = (state: RootState) => state.newOrder.paymentMethod;
export const selectorNewOrderContactPersonName = (state: RootState) => state.newOrder.contactPersonName;
export const selectorNewOrderContactPersonPhone = (state: RootState) => state.newOrder.contactPersonPhone;
export const selectorNewOrderDeliveryLocation = (state: RootState) => state.newOrder.deliveryLocation;
export const selectorNewOrderDeliveryAddress = (state: RootState) => state.newOrder.deliveryAddress;

export default newOrderSlice.reducer;
