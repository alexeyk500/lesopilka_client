import { AddressType, CategoryType, DeliveryMethodEnum, OptionsType, PaymentMethodEnum } from '../types/types';
import { addDays } from '../utils/functions';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { serverApi } from '../api/serverApi';

type NewOrderSliceType = {
  date: string;
  deliveryMethod: DeliveryMethodEnum;
  deliveryMethods: OptionsType[];
  deliveryLocation: OptionsType | undefined;
  deliveryAddress: string | undefined;
  contactPersonName: string | undefined;
  contactPersonPhone: string | undefined;
  paymentMethod: PaymentMethodEnum;
  paymentMethods: OptionsType[];
  manufacturerPickUpAddress: AddressType | undefined;
  isLoading: boolean;
};

const initialState: NewOrderSliceType = {
  date: addDays(new Date(), 1),
  deliveryMethod: DeliveryMethodEnum.pickup,
  deliveryMethods: [],
  deliveryLocation: undefined,
  deliveryAddress: undefined,
  contactPersonName: undefined,
  contactPersonPhone: undefined,
  paymentMethod: PaymentMethodEnum.transferToAccount,
  paymentMethods: [],
  manufacturerPickUpAddress: undefined,
  isLoading: false,
};

export const getPaymentMethodThunk = createAsyncThunk<CategoryType[], undefined, { rejectValue: string }>(
  'user/getPaymentMethodThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await serverApi.getPaymentMethods();
    } catch (e) {
      return rejectWithValue('Ошибка получения типов оплаты');
    }
  }
);

export const getDeliveryMethodThunk = createAsyncThunk<CategoryType[], undefined, { rejectValue: string }>(
  'user/getDeliveryMethodThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await serverApi.getDeliveryMethods();
    } catch (e) {
      return rejectWithValue('Ошибка получения типов доставки');
    }
  }
);

export const getManufacturerPickUpAddress = createAsyncThunk<{ address: AddressType }, number, { rejectValue: string }>(
  'user/getManufacturerPickUpAddress',
  async (mid, { rejectWithValue }) => {
    try {
      return await serverApi.getManufacturerPickUpAddress(mid);
    } catch (e) {
      return rejectWithValue('Ошибка получения адреса склада производителя');
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentMethodThunk.fulfilled, (state, action) => {
        state.paymentMethods = action.payload;
        state.isLoading = false;
      })
      .addCase(getDeliveryMethodThunk.fulfilled, (state, action) => {
        state.deliveryMethods = action.payload;
        state.isLoading = false;
      })
      .addCase(getManufacturerPickUpAddress.fulfilled, (state, action) => {
        state.manufacturerPickUpAddress = action.payload.address;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(getPaymentMethodThunk.pending, getDeliveryMethodThunk.pending, getManufacturerPickUpAddress.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(getPaymentMethodThunk.rejected, getDeliveryMethodThunk.rejected, getManufacturerPickUpAddress.rejected),
        (state) => {
          state.isLoading = false;
        }
      );
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
export const selectorNewOrderDeliveryMethods = (state: RootState) => state.newOrder.deliveryMethods;
export const selectorNewOrderPaymentMethods = (state: RootState) => state.newOrder.paymentMethods;
export const selectorNewOrderManufacturerPickUpAddress = (state: RootState) => state.newOrder.manufacturerPickUpAddress;

export default newOrderSlice.reducer;
