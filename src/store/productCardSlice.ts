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

const initialState: newCardSliceType = {
  productCard: { ...emptyCard },
  isLoading: false,
};

export const productCardSlice = createSlice({
  name: 'newCardSlice',
  initialState,
  reducers: {
    setProductCardProductHeightId: (state, action) => {
      state.productCard.heightId = action.payload;
    },
    setProductCardProductCustomHeight: (state, action) => {
      state.productCard.customHeight = action.payload;
    },
    setProductCardProductWidthId: (state, action) => {
      state.productCard.widthId = action.payload;
    },
    setProductCardProductCustomWidth: (state, action) => {
      state.productCard.customWidth = action.payload;
    },
    setProductCardProductLengthId: (state, action) => {
      state.productCard.lengthId = action.payload;
    },
    setProductCardProductCustomLength: (state, action) => {
      state.productCard.customLength = action.payload;
    },
    setProductCardProductCaliberId: (state, action) => {
      state.productCard.caliberId = action.payload;
    },
    setProductCardProductCustomCaliber: (state, action) => {
      state.productCard.customCaliber = action.payload;
    },
    setProductCode: (state, action) => {
      state.productCard.productCode = action.payload;
    },
    clearProductCard: (state) => {
      state.productCard = { ...emptyCard };
    },
    addImageToProductCardImages: (state, action) => {
      state.productCard.images.push(action.payload);
    },
    deleteImageFromProductCardImages: (state, action) => {
      state.productCard.images = state.productCard.images.filter((image) => image !== action.payload);
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

export const {
  setProductCardProductCustomHeight,
  setProductCardProductCustomWidth,
  setProductCardProductCustomLength,
  setProductCardProductCustomCaliber,
  setProductCardProductHeightId,
  setProductCardProductWidthId,
  setProductCardProductLengthId,
  setProductCardProductCaliberId,
  setProductCode,
  clearProductCard,
  addImageToProductCardImages,
  deleteImageFromProductCardImages,
  setProductCardSortId,
  setProductCardIsSeptic,
  setProductDescription,
  setProductPrice,
} = productCardSlice.actions;

export const selectorProductCard = (state: RootState) => state.productCard.productCard;

export default productCardSlice.reducer;
