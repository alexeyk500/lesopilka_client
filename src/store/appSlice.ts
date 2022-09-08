import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type AppSliceType = {
  showPopUp: boolean;
};

const initialState: AppSliceType = {
  showPopUp: false,
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    showPopUp: (state) => {
      state.showPopUp = true;
    },
    hidePopUp: (state) => {
      state.showPopUp = false;
    },
  },
});

export const { showPopUp, hidePopUp } = appSlice.actions;

export const selectorShowPopUp = (state: RootState) => state.app.showPopUp;

export default appSlice.reducer;
