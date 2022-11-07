import { FilterType, ProductsSortsEnum, ProductType } from '../types/types';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { serverApi } from '../api/serverApi';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';

type ProductsSliceType = {
  products: ProductType[];
  priceFrom: string | undefined;
  priceTo: string | undefined;
  sorting: ProductsSortsEnum;
  isLoading: boolean;
  filters: FilterType[];
};

const initialState: ProductsSliceType = {
  products: [],
  priceFrom: undefined,
  priceTo: undefined,
  sorting: ProductsSortsEnum.priceASC,
  isLoading: false,
  filters: [
    { title: 'categoryId', values: [] },
    { title: 'subCategoryId', values: [] },
    { title: 'subCategoryId', values: [] },
    { title: 'heightId', values: [] },
    { title: 'widthId', values: [] },
    { title: 'lengthId', values: [] },
    { title: 'caliberId', values: [] },
    { title: 'sortId', values: [] },
    { title: 'septicId', values: [] },
  ],
};

export const getProductsThunk = createAsyncThunk<ProductType[], undefined, { rejectValue: string }>(
  'user/getProductsThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await serverApi.getProducts();
    } catch (e) {
      return rejectWithValue('Ошибка получения товаров');
    }
  }
);

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
          state.filters[0].values = [{ key: 0, value: action.payload.value }];
        } else {
          const categoryId = state.filters[0].values?.[0]?.value;
          if (typeof categoryId === 'number') {
            const keyIndex = state.filters[filterIndex].values.findIndex(
              (filterValue) => filterValue.key === categoryId
            );
            if (keyIndex > -1) {
              state.filters[filterIndex].values[keyIndex].value = action.payload.value;
            } else {
              state.filters[filterIndex].values.push({ key: categoryId, value: action.payload.value });
            }
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isAnyOf(getProductsThunk.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(getProductsThunk.rejected), (state, action) => {
        state.isLoading = false;
        showErrorPopUp(action.payload!);
      });
  },
});

export const { setPriceFrom, setPriceTo, setSorting, setFiltersValue } = productsSlice.actions;

export const selectorProducts = (state: RootState) => state.products.products;
export const selectorPriceFrom = (state: RootState) => state.products.priceFrom;
export const selectorPriceTo = (state: RootState) => state.products.priceTo;
export const selectorSorting = (state: RootState) => state.products.sorting;
export const selectorFilters = (state: RootState) => state.products.filters;
export const selectorProductsLoading = (state: RootState) => state.products.isLoading;

export default productsSlice.reducer;
