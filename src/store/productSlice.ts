import { FilterType, ProductCardType, ProductsSortsEnum, ProductType } from '../types/types';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { serverApi } from '../api/serverApi';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';

const emptyEditCard: ProductCardType = {
  id: -1,
  categoryId: undefined,
  subCategoryId: undefined,
  productMaterialId: undefined,
  productCode: undefined,
  images: [],
  heightId: undefined,
  customHeight: undefined,
  widthId: undefined,
  customWidth: undefined,
  lengthId: undefined,
  customLength: undefined,
  sortId: undefined,
  caliberId: undefined,
  customCaliber: undefined,
  isSeptic: false,
  description: undefined,
  price: undefined,
  editionDate: undefined,
  publicationDate: undefined,
};

const fillProductCard = (productCard: ProductCardType, product: ProductType) => {
  productCard.id = product.id;
  productCard.categoryId = product.category?.id;
  productCard.subCategoryId = product.subCategory?.id;
  productCard.productMaterialId = product.material?.id;
  productCard.editionDate = product.editionDate;
  productCard.publicationDate = product.publicationDate;
};

type ProductsSliceType = {
  products: ProductType[];
  priceFrom: string | undefined;
  priceTo: string | undefined;
  sorting: ProductsSortsEnum;
  isLoading: boolean;
  isSaving: boolean;
  editCard: ProductCardType;
  formEditCardCategoryId: number | undefined;
  filters: FilterType[];
};

const initialState: ProductsSliceType = {
  products: [],
  priceFrom: undefined,
  priceTo: undefined,
  sorting: ProductsSortsEnum.priceASC,
  isLoading: false,
  isSaving: false,
  editCard: emptyEditCard,
  formEditCardCategoryId: undefined,
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

export const getProductThunk = createAsyncThunk<ProductType, string, { rejectValue: string }>(
  'product/getProductThunk',
  async (id, { rejectWithValue }) => {
    try {
      return await serverApi.getProduct(id);
    } catch (e) {
      return rejectWithValue(`Ошибка получения товара c id=${id}`);
    }
  }
);

export const getProductsThunk = createAsyncThunk<ProductType[], undefined, { rejectValue: string }>(
  'product/getProductsThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await serverApi.getProducts();
    } catch (e) {
      return rejectWithValue('Ошибка получения списка товаров');
    }
  }
);

export const createProductThunk = createAsyncThunk<ProductType, string, { rejectValue: string }>(
  'product/createProductThunk',
  async (token, { rejectWithValue }) => {
    try {
      return await serverApi.createProduct(token);
    } catch (e) {
      return rejectWithValue('Ошибка создания нового товара');
    }
  }
);

export type UpdateProductDataType = {
  productId: number;
  subCategoryId?: number | null;
  productMaterialId?: number | null;
};

export const updateProductThunk = createAsyncThunk<
  ProductType,
  { token: string; updateData: UpdateProductDataType },
  { rejectValue: string }
>('product/updateProductThunk', async ({ token, updateData }, { rejectWithValue }) => {
  try {
    return await serverApi.updateProduct(token, updateData);
  } catch (e) {
    return rejectWithValue(`Ошибка обновления полей товара c id=${updateData.productId}`);
  }
});

export const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    setFormEditCardCategoryId: (state, action) => {
      state.formEditCardCategoryId = action.payload;
    },
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
      .addCase(createProductThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getProductThunk.fulfilled, (state, action) => {
        fillProductCard(state.editCard, action.payload);
        state.isLoading = false;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        fillProductCard(state.editCard, action.payload);
        state.isSaving = false;
      })
      .addCase(updateProductThunk.pending, (state) => {
        state.isSaving = true;
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.isSaving = false;
        showErrorPopUp(action.payload!);
      })
      .addMatcher(isAnyOf(getProductsThunk.pending, createProductThunk.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(getProductsThunk.rejected, createProductThunk.rejected), (state, action) => {
        state.isLoading = false;
        showErrorPopUp(action.payload!);
      });
  },
});

export const { setPriceFrom, setPriceTo, setSorting, setFiltersValue, setFormEditCardCategoryId } =
  productsSlice.actions;

export const selectorProducts = (state: RootState) => state.products.products;
export const selectorPriceFrom = (state: RootState) => state.products.priceFrom;
export const selectorPriceTo = (state: RootState) => state.products.priceTo;
export const selectorSorting = (state: RootState) => state.products.sorting;
export const selectorEditCard = (state: RootState) => state.products.editCard;
export const selectorFilters = (state: RootState) => state.products.filters;
export const selectorProductsLoading = (state: RootState) => state.products.isLoading;
export const selectorProductsSaving = (state: RootState) => state.products.isSaving;
export const selectorFormEditCardCategoryId = (state: RootState) => state.products.formEditCardCategoryId;

export default productsSlice.reducer;
