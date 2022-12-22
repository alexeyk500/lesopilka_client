import { ProductType } from '../types/types';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { serverApi } from '../api/serverApi';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { RootState } from './store';

type BasketSliceType = {
  products: ProductType[];
  isLoading: boolean;
};

const initialState: BasketSliceType = {
  products: [],
  isLoading: false,
};

export const getBasketProductsThunk = createAsyncThunk<ProductType[], string, { rejectValue: string }>(
  'basket/getBasketProductsThunk',
  async (token, { rejectWithValue }) => {
    try {
      return await serverApi.getBasketProducts(token);
    } catch (e: any) {
      return rejectWithValue('Ошибка получения списка товаров корзины\n' + e.response?.data?.message);
    }
  }
);

export const toggleProductForBasketThunk = createAsyncThunk<
  ProductType[],
  { productId: number; token: string },
  { rejectValue: string }
>('basket/addProductsToBasketThunk', async ({ productId, token }, { rejectWithValue }) => {
  try {
    return await serverApi.toggleProductForBasket(productId, token);
  } catch (e: any) {
    return rejectWithValue('Ошибка добавления товара в корзину\n' + e.response?.data?.message);
  }
});

export const updateBasketProductAmountThunk = createAsyncThunk<
  ProductType[],
  { productId: number; amount: number; token: string },
  { rejectValue: string }
>('basket/updateBasketProductAmountThunk', async ({ productId, amount, token }, { rejectWithValue }) => {
  try {
    return await serverApi.updateBasketProductAmount(productId, amount, token);
  } catch (e: any) {
    return rejectWithValue('Ошибка обновления количества товара в корзине\n' + e.response?.data?.message);
  }
});

export const basketSlice = createSlice({
  name: 'basketSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getBasketProductsThunk.pending, toggleProductForBasketThunk.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(
          getBasketProductsThunk.fulfilled,
          toggleProductForBasketThunk.fulfilled,
          updateBasketProductAmountThunk.fulfilled
        ),
        (state, action) => {
          state.products = action.payload;
          state.isLoading = false;
        }
      )
      .addMatcher(isAnyOf(getBasketProductsThunk.rejected, toggleProductForBasketThunk.rejected), (state, action) => {
        state.isLoading = false;
        showErrorPopUp(action.payload!);
      });
  },
});

export const selectorBasketProducts = (state: RootState) => state.basket.products;

export default basketSlice.reducer;
