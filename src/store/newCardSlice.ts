import {CardType} from "../types/types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";

type newCardSliceType = {
  newCard: CardType;
  isLoading: boolean;
};

const initialState: newCardSliceType = {
  newCard: {
    categoryId: undefined,
    subCategoryId: undefined,
    productCode: undefined,
    photos: [],
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
  reducers: {},
});

export const newCard = (state: RootState) => state.newCard.newCard;
export const isLoading = (state: RootState) => state.newCard.isLoading;

export default newCardSlice.reducer;
