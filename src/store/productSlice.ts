import { ProductsSortsEnum, ProductType } from '../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type ProductsSliceType = {
  products: ProductType[];
  priceFrom: string | undefined;
  priceTo: string | undefined;
  sorting: ProductsSortsEnum;
};

const initialState: ProductsSliceType = {
  products: [],
  priceFrom: undefined,
  priceTo: undefined,
  sorting: ProductsSortsEnum.priceASC,
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
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
  },
});

export const { setPriceFrom, setPriceTo, setSorting } = productsSlice.actions;

export const selectorPriceFrom = (state: RootState) => state.products.priceFrom;
export const selectorPriceTo = (state: RootState) => state.products.priceTo;
export const selectorSorting = (state: RootState) => state.products.sorting;

export default productsSlice.reducer;
