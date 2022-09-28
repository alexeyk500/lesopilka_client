import { CategoryType } from '../types/types';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { serverApi } from '../api/serverApi';
import { RootState } from './store';

type CatalogSliceType = {
  categories: CategoryType[];
  isLoading: boolean;
};

const initialState: CatalogSliceType = {
  categories: [],
  isLoading: false,
};

export const getCategoriesThunk = createAsyncThunk<CategoryType[], undefined, { rejectValue: string }>(
  'user/getCategoriesThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await serverApi.getCategories();
    } catch (e) {
      return rejectWithValue('Ошибка получения категорий каталога');
    }
  }
);

export const catalogSlice = createSlice({
  name: 'catalogSlice',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isAnyOf(getCategoriesThunk.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(getCategoriesThunk.rejected), (state, action) => {
        state.isLoading = false;
        console.log('ошибка =', action.payload);
      });
  },
});

export const selectorCategories = (state: RootState) => state.catalog.categories;
export const catalogIsLoading = (state: RootState) => state.catalog.isLoading;

export default catalogSlice.reducer;
