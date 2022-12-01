import { ProductCardType, ProductType, QueryEnum } from '../types/types';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { serverApi } from '../api/serverApi';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { DeleteResultType } from '../api/serverResponseTypes';

const emptyEditCard: ProductCardType = {
  id: -1,
  categoryId: undefined,
  subCategoryId: undefined,
  productMaterialId: undefined,
  productCode: undefined,
  images: [],
  height: undefined,
  width: undefined,
  length: undefined,
  caliber: undefined,
  sortId: undefined,
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
  productCard.sortId = product.sort?.id;
  productCard.isSeptic = product.isSeptic ? product.isSeptic : false;
  productCard.images = product.images;
  productCard.description = product.description;
  productCard.productCode = product.code;
  productCard.price = product.price;
  productCard.height = product.height;
  productCard.width = product.width;
  productCard.length = product.length;
  productCard.caliber = product.caliber;
};

type ProductsSliceType = {
  products: ProductType[];
  isLoading: boolean;
  isSaving: boolean;
  editCard: ProductCardType;
  catalogSearchParams: URLSearchParams | undefined;
  queryFilters: Array<string | undefined>;
};

const initialState: ProductsSliceType = {
  products: [],
  isLoading: false,
  isSaving: false,
  editCard: emptyEditCard,
  catalogSearchParams: undefined,
  queryFilters: [],
};

export const getProductThunk = createAsyncThunk<ProductType, number, { rejectValue: string }>(
  'product/getProductThunk',
  async (id, { rejectWithValue }) => {
    try {
      return await serverApi.getProduct(id);
    } catch (e: any) {
      return rejectWithValue(`Ошибка получения товара c id=${id}\n` + e.response?.data?.message);
    }
  }
);

export const getProductsThunk = createAsyncThunk<ProductType[], URLSearchParams | undefined, { rejectValue: string }>(
  'product/getProductsThunk',
  async (urlSearchParams, { rejectWithValue }) => {
    try {
      return await serverApi.getProducts(urlSearchParams);
    } catch (e: any) {
      return rejectWithValue('Ошибка получения списка товаров\n' + e.response?.data?.message);
    }
  }
);

export const createProductThunk = createAsyncThunk<ProductType, string, { rejectValue: string }>(
  'product/createProductThunk',
  async (token, { rejectWithValue }) => {
    try {
      return await serverApi.createProduct(token);
    } catch (e: any) {
      return rejectWithValue('Ошибка создания нового товара\n' + e.response?.data?.message);
    }
  }
);

export type UpdateProductDataType = {
  productId: number;
  subCategoryId?: number | null;
  productMaterialId?: number | null;
  categorySizeId?: number | null;
  description?: string | null;
};

export const updateProductThunk = createAsyncThunk<
  ProductType,
  { token: string; updateData: UpdateProductDataType },
  { rejectValue: string }
>('product/updateProductThunk', async ({ token, updateData }, { rejectWithValue }) => {
  try {
    return await serverApi.updateProduct(token, updateData);
  } catch (e: any) {
    return rejectWithValue(`Ошибка обновления полей товара c id=${updateData.productId}\n` + e.response?.data?.message);
  }
});

export const updateProductDescriptionThunk = createAsyncThunk<
  ProductType,
  { token: string; updateData: UpdateProductDataType },
  { rejectValue: string }
>('product/updateProductDescriptionThunk', async ({ token, updateData }, { rejectWithValue }) => {
  try {
    return await serverApi.updateProductDescription(token, updateData);
  } catch (e: any) {
    return rejectWithValue(
      `Ошибка обновления описания товара c id=${updateData.productId}\n` + e.response?.data?.message
    );
  }
});

export const uploadPictureToProductThunk = createAsyncThunk<
  ProductType,
  { token: string; productId: number; img: File },
  { rejectValue: string }
>('product/uploadPictureToProductThunk', async ({ token, productId, img }, { rejectWithValue }) => {
  try {
    await serverApi.uploadPictureToProduct(token, productId, img);
    return await serverApi.getProduct(productId);
  } catch (e: any) {
    return rejectWithValue('Ошибка загрузки изображения для товара\n' + e.response?.data?.message);
  }
});

export const deleteProductPictureThunk = createAsyncThunk<
  ProductType,
  { token: string; productId: number; fileName: string },
  { rejectValue: string }
>('product/deleteProductPictureThunk', async ({ token, productId, fileName }, { rejectWithValue }) => {
  try {
    await serverApi.deletePicture(token, fileName);
    return await serverApi.getProduct(productId);
  } catch (e: any) {
    return rejectWithValue(`Ошибка удаления изображения для товара ${productId}\n` + e.response?.data?.message);
  }
});

export const deleteProductThunk = createAsyncThunk<
  DeleteResultType,
  { token: string; productId: number },
  { rejectValue: string }
>('product/deleteProductThunk', async ({ token, productId }, { rejectWithValue }) => {
  try {
    return await serverApi.deleteProduct(token, productId);
  } catch (e: any) {
    return rejectWithValue(`Ошибка удаления товара ${productId}\n` + e.response?.data?.message);
  }
});

export const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    clearEditCard: (state) => {
      state.editCard = emptyEditCard;
      state.catalogSearchParams = undefined;
    },
    setCatalogSearchParams: (state, action) => {
      state.catalogSearchParams = action.payload;
    },
    updateQueryFilters: (state, action) => {
      const searchParams = new URLSearchParams(action.payload);
      const cid = Number(searchParams.get(QueryEnum.CatalogCategory));
      if (cid && cid > 0) {
        state.queryFilters[cid] = action.payload;
      } else {
        state.queryFilters[0] = action.payload;
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
      .addMatcher(
        isAnyOf(
          updateProductThunk.fulfilled,
          uploadPictureToProductThunk.fulfilled,
          deleteProductPictureThunk.fulfilled,
          updateProductDescriptionThunk.fulfilled
        ),
        (state, action) => {
          fillProductCard(state.editCard, action.payload);
          state.isSaving = false;
        }
      )
      .addMatcher(isAnyOf(getProductsThunk.pending, createProductThunk.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(getProductsThunk.rejected, createProductThunk.rejected), (state, action) => {
        state.isLoading = false;
        showErrorPopUp(action.payload!);
      })
      .addMatcher(
        isAnyOf(
          updateProductThunk.pending,
          uploadPictureToProductThunk.pending,
          deleteProductPictureThunk.pending,
          updateProductDescriptionThunk.pending
        ),
        (state) => {
          state.isSaving = true;
        }
      )
      .addMatcher(
        isAnyOf(
          updateProductThunk.rejected,
          uploadPictureToProductThunk.rejected,
          deleteProductPictureThunk.rejected,
          updateProductDescriptionThunk.rejected
        ),
        (state, action) => {
          state.isSaving = false;
          showErrorPopUp(action.payload!);
        }
      );
  },
});

export const { clearEditCard, setCatalogSearchParams, updateQueryFilters } = productsSlice.actions;

export const selectorProducts = (state: RootState) => state.products.products;
export const selectorEditCard = (state: RootState) => state.products.editCard;
export const selectorCatalogSearchParams = (state: RootState) => state.products.catalogSearchParams;
export const selectorQueryFilters = (state: RootState) => state.products.queryFilters;
export const selectorProductsLoading = (state: RootState) => state.products.isLoading;
export const selectorProductsSaving = (state: RootState) => state.products.isSaving;

export default productsSlice.reducer;
