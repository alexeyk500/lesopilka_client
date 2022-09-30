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
    widthId: undefined,
    lengthId: undefined,
    sortId: undefined,
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
  },
});

export const { setCategoryId, setSubCategoryId, setProductMaterialId } = newCardSlice.actions;

export const selectorNewCard = (state: RootState) => state.newCard.newCard;
export const selectorIsLoading = (state: RootState) => state.newCard.isLoading;

export default newCardSlice.reducer;
