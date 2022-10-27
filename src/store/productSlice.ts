import { FilterType, ProductsSortsEnum, ProductType } from '../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import {getValueFromFilter} from "../utils/functions";

type ProductsSliceType = {
  products: ProductType[];
  priceFrom: string | undefined;
  priceTo: string | undefined;
  sorting: ProductsSortsEnum;
  filters: FilterType[];
};

const initialState: ProductsSliceType = {
  products: [],
  priceFrom: undefined,
  priceTo: undefined,
  sorting: ProductsSortsEnum.priceASC,
  // filters: [
  //   { title: 'categoryId', value: undefined },
  //   { title: 'subCategoryId', value: undefined },
  //   { title: 'heightId', value: undefined },
  //   { title: 'widthId', value: undefined },
  //   { title: 'lengthId', value: undefined },
  //   { title: 'caliberId', value: undefined },
  //   { title: 'sortId', value: undefined },
  // ],

  filters: [
    { title: 'categoryId', values: [] },
    { title: 'subCategoryId', values: [] },
  ],
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
    setFiltersValue: (state, action) => {
      const filterIndex = state.filters.findIndex((filter) => action.payload.title === filter.title);
      if (filterIndex > -1) {
        if (action.payload.title === 'categoryId') {
          state.filters[filterIndex].values = [{ key: 0, value: action.payload.value }];
        } else {
          const categoryId = getValueFromFilter(state.filters, 'categoryId');
          if (typeof (categoryId) === 'number' ) {
            const keyIndex = state.filters[filterIndex].values.findIndex(filterValue => filterValue.key === categoryId)
            if (keyIndex > -1) {
              state.filters[filterIndex].values[keyIndex].value = action.payload.value
            } else {
              state.filters[filterIndex].values.push({key: categoryId, value: action.payload.value})
            }
          }
        }
      }
    },
  },
});

export const { setPriceFrom, setPriceTo, setSorting, setFiltersValue } = productsSlice.actions;

export const selectorPriceFrom = (state: RootState) => state.products.priceFrom;
export const selectorPriceTo = (state: RootState) => state.products.priceTo;
export const selectorSorting = (state: RootState) => state.products.sorting;
export const selectorFilters = (state: RootState) => state.products.filters;

export default productsSlice.reducer;
