import { PriceSelectedTypeEnum, ProductType } from '../types/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { GetProductsServerType } from '../api/serverResponseTypes';
import { serverApi } from '../api/serverApi';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';

type PriceSliceType = {
  products: ProductType[];
  selectedPriceType: PriceSelectedTypeEnum;
  isLoading: boolean;
  editProductId: number | undefined;
  priceDownloading: boolean
};

const initialState: PriceSliceType = {
  products: [],
  selectedPriceType: PriceSelectedTypeEnum.published,
  isLoading: false,
  editProductId: undefined,
  priceDownloading: false
};

export const getPriceProductsThunk = createAsyncThunk<
  GetProductsServerType,
  URLSearchParams | undefined,
  { rejectValue: string }
>('product/getPriceProductsThunk', async (urlSearchParams, { rejectWithValue }) => {
  try {
    return await serverApi.getProducts(urlSearchParams);
  } catch (e: any) {
    return rejectWithValue('Ошибка получения списка товаров\n' + e.response?.data?.message);
  }
});

export const priceSlice = createSlice({
  name: 'priceSlice',
  initialState,
  reducers: {
    setSelectedType: (state, actions) => {
      state.selectedPriceType = actions.payload;
    },
    setPriceEditProductId: (state, actions) => {
      state.editProductId = actions.payload;
    },
    setPriceDownLoading: (state, actions) => {
      state.priceDownloading = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPriceProductsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPriceProductsThunk.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.isLoading = false;
      })
      .addCase(getPriceProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        showErrorPopUp(action.payload!);
      });
  },
});

export const { setSelectedType, setPriceEditProductId, setPriceDownLoading } = priceSlice.actions;

export const selectorSelectedPriceType = (state: RootState) => state.price.selectedPriceType;
export const selectorPriceProducts = (state: RootState) => state.price.products;
export const selectorPriceEditProductId = (state: RootState) => state.price.editProductId;
export const selectorPriceDownloading = (state: RootState) => state.price.priceDownloading;

export default priceSlice.reducer;
