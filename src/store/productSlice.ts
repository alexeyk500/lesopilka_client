import { ProductCardType, ProductsSortsEnum, ProductType, QueryEnum, SizeTypeEnum } from '../types/types';
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
  customHeightValue: undefined,
  widthId: undefined,
  customWidthValue: undefined,
  lengthId: undefined,
  customLengthValue: undefined,
  sortId: undefined,
  caliberId: undefined,
  customCaliberValue: undefined,
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
  productCard.isSeptic = product.isSeptic;
  productCard.images = product.images;

  const heightId = product.sizes?.find((size) => size.type === SizeTypeEnum.height)?.id;
  productCard.heightId = heightId && heightId > 0 ? heightId : undefined;
  productCard.customHeightValue = product.sizes?.find(
    (size) => size.type === SizeTypeEnum.height && size.isCustomSize === true
  )?.value;

  const widthId = product.sizes?.find((size) => size.type === SizeTypeEnum.width)?.id;
  productCard.widthId = widthId && widthId > 0 ? widthId : undefined;
  productCard.customWidthValue = product.sizes?.find(
    (size) => size.type === SizeTypeEnum.width && size.isCustomSize === true
  )?.value;

  const lengthId = product.sizes?.find((size) => size.type === SizeTypeEnum.length)?.id;
  productCard.lengthId = lengthId && lengthId > 0 ? lengthId : undefined;
  productCard.customLengthValue = product.sizes?.find(
    (size) => size.type === SizeTypeEnum.length && size.isCustomSize === true
  )?.value;

  const caliberId = product.sizes?.find((size) => size.type === SizeTypeEnum.caliber)?.id;
  productCard.caliberId = caliberId && caliberId > 0 ? caliberId : undefined;
  productCard.customCaliberValue = product.sizes?.find(
    (size) => size.type === SizeTypeEnum.caliber && size.isCustomSize === true
  )?.value;
};

type ProductsSliceType = {
  products: ProductType[];
  priceFrom: string | undefined;
  priceTo: string | undefined;
  sorting: ProductsSortsEnum;
  isLoading: boolean;
  isSaving: boolean;
  editCard: ProductCardType;
  catalogSearchParams: URLSearchParams | undefined;
  queryFilters: Array<string | undefined>;
};

const initialState: ProductsSliceType = {
  products: [],
  priceFrom: undefined,
  priceTo: undefined,
  sorting: ProductsSortsEnum.priceASC,
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
  categorySizeId?: number;
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
    return rejectWithValue('Ошибка удаления изображения для товара\n' + e.response?.data?.message);
  }
});

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
    // resetQueryFilters: (state, action) => {
    //   const searchParams = new URLSearchParams(action.payload);
    //   const cid = Number(searchParams.get(QueryEnum.CatalogCategory));
    //   if (cid && cid > 0) {
    //     state.queryFilters[cid] = undefined;
    //   }
    // },
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
          deleteProductPictureThunk.fulfilled
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
        isAnyOf(updateProductThunk.pending, uploadPictureToProductThunk.pending, deleteProductPictureThunk.pending),
        (state) => {
          state.isSaving = true;
        }
      )
      .addMatcher(
        isAnyOf(updateProductThunk.rejected, uploadPictureToProductThunk.rejected, deleteProductPictureThunk.rejected),
        (state, action) => {
          state.isSaving = false;
          showErrorPopUp(action.payload!);
        }
      );
  },
});

export const { setPriceFrom, setPriceTo, setSorting, clearEditCard, setCatalogSearchParams, updateQueryFilters } =
  productsSlice.actions;

export const selectorProducts = (state: RootState) => state.products.products;
export const selectorPriceFrom = (state: RootState) => state.products.priceFrom;
export const selectorPriceTo = (state: RootState) => state.products.priceTo;
export const selectorSorting = (state: RootState) => state.products.sorting;
export const selectorEditCard = (state: RootState) => state.products.editCard;
export const selectorCatalogSearchParams = (state: RootState) => state.products.catalogSearchParams;
export const selectorQueryFilters = (state: RootState) => state.products.queryFilters;
export const selectorProductsLoading = (state: RootState) => state.products.isLoading;
export const selectorProductsSaving = (state: RootState) => state.products.isSaving;

export default productsSlice.reducer;
