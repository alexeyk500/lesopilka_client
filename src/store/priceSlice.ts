import { PriceSelectedTypeEnum, ProductType } from '../types/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { GetProductsServerType } from '../api/serverResponseTypes';
import { serverApi } from '../api/serverApi';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';

type PriceSliceType = {
  products: ProductType[];
  selectedType: PriceSelectedTypeEnum;
  isLoading: boolean;
};

const initialState: PriceSliceType = {
  products: [],
  selectedType: PriceSelectedTypeEnum.published,
  isLoading: false,
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
      state.selectedType = actions.payload;
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

export const { setSelectedType } = priceSlice.actions;

export const selectorSelectedType = (state: RootState) => state.price.selectedType;
export const selectorPriceProducts = (state: RootState) => state.price.products;

export default priceSlice.reducer;
