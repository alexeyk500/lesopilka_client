import { ProductCardType } from '../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type newCardSliceType = {
  productCard: ProductCardType;
  isLoading: boolean;
};

const emptyCard = {
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
  isDried: false,
  description: undefined,
  price: undefined,
  editionDate: undefined,
  publicationDate: undefined,
};

const initialState: newCardSliceType = {
  productCard: { ...emptyCard },
  isLoading: false,
};

export const productCardSlice = createSlice({
  name: 'newCardSlice',
  initialState,
  reducers: {
    setProductCardProductHeight: (state, action) => {
      state.productCard.height = action.payload;
    },
    setProductCode: (state, action) => {
      state.productCard.productCode = action.payload;
    },
    addImageToProductCardImages: (state, action) => {
      state.productCard.images?.push(action.payload);
    },
    deleteImageFromProductCardImages: (state, action) => {
      state.productCard.images = state.productCard.images?.filter((image) => image !== action.payload);
    },
    setProductCardSortId: (state, action) => {
      state.productCard.sortId = action.payload;
    },
    setProductCardIsSeptic: (state, action) => {
      state.productCard.isSeptic = action.payload;
    },
    setProductDescription: (state, action) => {
      state.productCard.description = action.payload;
    },
    setProductPrice: (state, action) => {
      state.productCard.price = action.payload;
    },
  },
});

export const { setProductCode, setProductCardSortId, setProductCardIsSeptic, setProductDescription, setProductPrice } =
  productCardSlice.actions;

export const selectorProductCard = (state: RootState) => state.productCard.productCard;

export default productCardSlice.reducer;
