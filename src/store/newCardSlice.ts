import { CardType } from '../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type newCardSliceType = {
  newCard: CardType;
  isLoading: boolean;
};

const emptyCard = {
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
  antisepticId: undefined,
  description: undefined,
  price: undefined,
};

const initialState: newCardSliceType = {
  newCard: { ...emptyCard },
  isLoading: false,
};

export const newCardSlice = createSlice({
  name: 'newCardSlice',
  initialState,
  reducers: {
    setNewCardCategoryId: (state, action) => {
      state.newCard.categoryId = action.payload;
    },
    setNewCardSubCategoryId: (state, action) => {
      state.newCard.subCategoryId = action.payload;
    },
    setNewCardProductMaterialId: (state, action) => {
      state.newCard.productMaterialId = action.payload;
    },
    setNewCardProductHeightId: (state, action) => {
      state.newCard.heightId = action.payload;
    },
    setNewCardProductCustomHeight: (state, action) => {
      state.newCard.customHeight = action.payload;
    },
    setNewCardProductWidthId: (state, action) => {
      state.newCard.widthId = action.payload;
    },
    setNewCardProductCustomWidth: (state, action) => {
      state.newCard.customWidth = action.payload;
    },
    setNewCardProductLengthId: (state, action) => {
      state.newCard.lengthId = action.payload;
    },
    setNewCardProductCustomLength: (state, action) => {
      state.newCard.customLength = action.payload;
    },
    setNewCardProductCaliberId: (state, action) => {
      state.newCard.caliberId = action.payload;
    },
    setNewCardProductCustomCaliber: (state, action) => {
      state.newCard.customCaliber = action.payload;
    },
    setProductCode: (state, action) => {
      state.newCard.productCode = action.payload;
    },
    clearNewCard: (state) => {
      state.newCard = { ...emptyCard };
    },
    addImageToNewCardImages: (state, action) => {
      state.newCard.images.push(action.payload);
    },
    deleteImageFromNewCardImages: (state, action) => {
      state.newCard.images = state.newCard.images.filter(image=>image !== action.payload);
    },
  },
});

export const {
  setNewCardCategoryId,
  setNewCardSubCategoryId,
  setNewCardProductMaterialId,
  setNewCardProductCustomHeight,
  setNewCardProductCustomWidth,
  setNewCardProductCustomLength,
  setNewCardProductCustomCaliber,
  setNewCardProductHeightId,
  setNewCardProductWidthId,
  setNewCardProductLengthId,
  setNewCardProductCaliberId,
  setProductCode,
  clearNewCard,
  addImageToNewCardImages,
  deleteImageFromNewCardImages,
} = newCardSlice.actions;

export const selectorNewCard = (state: RootState) => state.newCard.newCard;
export const selectorIsLoading = (state: RootState) => state.newCard.isLoading;

export default newCardSlice.reducer;
