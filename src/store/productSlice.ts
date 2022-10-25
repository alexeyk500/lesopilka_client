import { ProductType } from '../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type ProductsSliceType = {
  products: ProductType[];
  priceFrom: string | undefined;
  priceTo: string | undefined;
};

const initialState: ProductsSliceType = {
  products: [],
  priceFrom: undefined,
  priceTo: undefined,
};

export const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    setPriceFrom: (state, action) => {
      state.priceFrom = action.payload;
    },
    setPriceTo: (state, action) => {
      state.priceTo = action.payload;
    },
  },
});

export const { setPriceFrom, setPriceTo } = productsSlice.actions;

export const selectorPriceFrom = (state: RootState) => state.products.priceFrom;
export const selectorPriceTo = (state: RootState) => state.products.priceTo;

export default productsSlice.reducer;
