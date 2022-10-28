import { CategorySizeType, CategoryType, ProductMaterialType, ProductSortsType, SubCategoryType } from '../types/types';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { serverApi } from '../api/serverApi';
import { RootState } from './store';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';

type CatalogSliceType = {
  categories: CategoryType[];
  subCategories: SubCategoryType[];
  productMaterials: ProductMaterialType[];
  productSorts: ProductSortsType[];
  categorySizes: CategorySizeType[];
  isLoading: boolean;
};

const initialState: CatalogSliceType = {
  categories: [],
  subCategories: [],
  productMaterials: [],
  productSorts: [],
  categorySizes: [],
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
      return await serverApi.getProductMaterials();
    } catch (e) {
      return rejectWithValue('Ошибка получения справочника материалов для продукта');
    }
  }
);

export const getProductSortsThunk = createAsyncThunk<ProductSortsType[], undefined, { rejectValue: string }>(
  'user/getProductSortsThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await serverApi.getProductSorts();
    } catch (e) {
      return rejectWithValue('Ошибка получения справочника для сортов продукта');
    }
  }
);

export const getCategorySizesThunk = createAsyncThunk<CategorySizeType[], undefined, { rejectValue: string }>(
  'user/getCategorySizesThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await serverApi.getCategorySizes();
    } catch (e) {
      return rejectWithValue('Ошибка размеров для категорий');
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
      .addCase(getProductSortsThunk.fulfilled, (state, action) => {
        state.productSorts = action.payload;
        state.isLoading = false;
      })
      .addCase(getCategorySizesThunk.fulfilled, (state, action) => {
        state.categorySizes = action.payload;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          getCategoriesThunk.pending,
          getSubCategoriesThunk.pending,
          getProductMaterialsThunk.pending,
          getProductSortsThunk.pending,
          getCategorySizesThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getCategoriesThunk.rejected,
          getSubCategoriesThunk.rejected,
          getProductMaterialsThunk.rejected,
          getProductSortsThunk.rejected,
          getCategorySizesThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          showErrorPopUp(action.payload!);
        }
      );
  },
});

export const selectorCatalogIsLoading = (state: RootState) => state.catalog.isLoading;
export const selectorCategories = (state: RootState) => state.catalog.categories;
export const selectorSubCategories = (state: RootState) => state.catalog.subCategories;
export const selectorProductMaterials = (state: RootState) => state.catalog.productMaterials;
export const selectorProductSorts = (state: RootState) => state.catalog.productSorts;
export const selectorCategorySizes = (state: RootState) => state.catalog.categorySizes;

export default catalogSlice.reducer;
