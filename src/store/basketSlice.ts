import {ProductType} from "../types/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {serverApi} from "../api/serverApi";
import {showErrorPopUp} from "../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm";
import {RootState} from "./store";

type BasketSliceType = {
  products: ProductType[];
  isLoading: boolean;
}

const initialState: BasketSliceType = {
  products: [],
  isLoading: false,
}

export const getBasketProductsThunk = createAsyncThunk<
  ProductType[],
  string,
  { rejectValue: string }
  >('basket/getBasketProductsThunk', async (token, { rejectWithValue }) => {
  try {
    return await serverApi.getBasketProducts(token);
  } catch (e: any) {
    return rejectWithValue('Ошибка получения списка товаров корзины\n' + e.response?.data?.message);
  }
});

export const basketSlice = createSlice({
  name: 'basketSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBasketProductsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBasketProductsThunk.fulfilled, (state, action) => {
        console.log('action.payload =', action.payload)
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getBasketProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        showErrorPopUp(action.payload!);
      });
  },
});

export const selectorBasketProducts = (state: RootState) => state.basket.products;

export default basketSlice.reducer;
