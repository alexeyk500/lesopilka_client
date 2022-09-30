import { CategoryType, ProductMaterialType, SubCategoryType } from '../types/types';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { serverApi } from '../api/serverApi';
import { RootState } from './store';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';

type CatalogSliceType = {
  categories: CategoryType[];
  subCategories: SubCategoryType[];
  productMaterials: ProductMaterialType[];
  isLoading: boolean;
};

const initialState: CatalogSliceType = {
  categories: [],
  subCategories: [],
  productMaterials: [],
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

export const getSubCategoriesThunk = createAsyncThunk<SubCategoryType[], undefined, { rejectValue: string }>(
  'user/getSubCategoriesThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await serverApi.getSubCategories();
    } catch (e) {
      return rejectWithValue('Ошибка получения подкатегорий каталога');
    }
  }
);

export const getProductMaterialsThunk = createAsyncThunk<ProductMaterialType[], undefined, { rejectValue: string }>(
  'user/getProductMaterialsThunk',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        return await serverApi.getProductMaterials(token);
      }
      return rejectWithValue('Пользователь не авторизован');
    } catch (e) {
      return rejectWithValue('Ошибка получения материалов для продукта');
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
      .addCase(getSubCategoriesThunk.fulfilled, (state, action) => {
        state.subCategories = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductMaterialsThunk.fulfilled, (state, action) => {
        state.productMaterials = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isAnyOf(getCategoriesThunk.pending, getSubCategoriesThunk.pending, getProductMaterialsThunk.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(getCategoriesThunk.rejected, getSubCategoriesThunk.rejected, getProductMaterialsThunk.rejected), (state, action) => {
        state.isLoading = false;
        showErrorPopUp(action.payload!);
      });
  },
});

export const selectorCategories = (state: RootState) => state.catalog.categories;
export const selectorSubCategories = (state: RootState) => state.catalog.subCategories;
export const selectorCatalogIsLoading = (state: RootState) => state.catalog.isLoading;

export default catalogSlice.reducer;
