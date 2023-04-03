import { PriceSelectedTypeEnum, ProductType } from '../types/types';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { GetProductsServerType } from '../api/serverResponseTypes';
import { serverApi } from '../api/serverApi';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { PageEnum } from '../components/AppRouter/AppRouter';

type PriceSliceType = {
  products: ProductType[];
  selectedPriceType: PriceSelectedTypeEnum;
  isLoading: boolean;
  editProductId: number | undefined;
  isPDFDownloading: boolean;
  returnTo: string;
};

const initialState: PriceSliceType = {
  products: [],
  selectedPriceType: PriceSelectedTypeEnum.published,
  isLoading: false,
  editProductId: undefined,
  isPDFDownloading: false,
  returnTo: PageEnum.RootPage,
};

export const getPriceProductsThunk = createAsyncThunk<
  GetProductsServerType,
  URLSearchParams | undefined,
  { rejectValue: string }
>('price/getPriceProductsThunk', async (urlSearchParams, { rejectWithValue }) => {
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
      state.isPDFDownloading = actions.payload;
    },
    setPriceReturnTo: (state, actions) => {
      state.returnTo = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPriceProductsThunk.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.isLoading = false;
      })
      .addCase(getPriceProductsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(getPriceProductsThunk.rejected), (state, action) => {
        state.isLoading = false;
        state.isPDFDownloading = false;
        showErrorPopUp(action.payload ? action.payload : 'Неизвестная ошибка - priceSlice');
      });
  },
});

export const { setSelectedType, setPriceEditProductId, setPriceDownLoading, setPriceReturnTo } = priceSlice.actions;

export const selectorSelectedPriceType = (state: RootState) => state.price.selectedPriceType;
export const selectorPriceProducts = (state: RootState) => state.price.products;
export const selectorPriceEditProductId = (state: RootState) => state.price.editProductId;
export const selectorIsPriceDownloading = (state: RootState) => state.price.isPDFDownloading;
export const selectorPriceReturnTo = (state: RootState) => state.price.returnTo;

export default priceSlice.reducer;
