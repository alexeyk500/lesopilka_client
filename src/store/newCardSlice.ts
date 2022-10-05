import { CardType } from '../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type newCardSliceType = {
  newCard: CardType;
  isLoading: boolean;
};

const initialState: newCardSliceType = {
  newCard: {
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
  },
  isLoading: false,
};

export const newCardSlice = createSlice({
  name: 'newCardSlice',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.newCard.categoryId = action.payload;
    },
    setSubCategoryId: (state, action) => {
      state.newCard.subCategoryId = action.payload;
    },
    setProductMaterialId: (state, action) => {
      state.newCard.productMaterialId = action.payload;
    },
    setProductHeightId: (state, action) => {
      state.newCard.heightId = action.payload;
    },
    setProductCustomHeight: (state, action) => {
      state.newCard.customHeight = action.payload;
    },
    setProductWidthId: (state, action) => {
      state.newCard.widthId = action.payload;
    },
    setProductCustomWidth: (state, action) => {
      state.newCard.customWidth = action.payload;
    },
    setProductLengthId: (state, action) => {
      state.newCard.lengthId = action.payload;
    },
    setProductCustomLength: (state, action) => {
      state.newCard.customLength = action.payload;
    },
    setProductCaliberId: (state, action) => {
      state.newCard.caliberId = action.payload;
    },
    setProductCustomCaliber: (state, action) => {
      state.newCard.customCaliber = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSubCategoryId,
  setProductMaterialId,
  setProductCustomHeight,
  setProductCustomWidth,
  setProductCustomLength,
  setProductCustomCaliber,
  setProductHeightId,
  setProductWidthId,
  setProductLengthId,
  setProductCaliberId,
} = newCardSlice.actions;

export const selectorNewCard = (state: RootState) => state.newCard.newCard;
export const selectorIsLoading = (state: RootState) => state.newCard.isLoading;

export default newCardSlice.reducer;
