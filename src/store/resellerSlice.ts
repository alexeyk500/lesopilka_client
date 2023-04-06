import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type ResellerSliceType = {
  licensesStatusOptionsId: number;
  isLoading: boolean;
};

const initialState: ResellerSliceType = {
  licensesStatusOptionsId: 0,
  isLoading: false,
};

export const resellerSlice = createSlice({
  name: 'resellerSlice',
  initialState,
  reducers: {
    setLicensesStatusOptionsId: (state, actions) => {
      state.licensesStatusOptionsId = actions.payload;
    },
  },
});

export const { setLicensesStatusOptionsId } = resellerSlice.actions;

export const selectorResellerLicensesStatusOptionsId = (state: RootState) => state.reseller.licensesStatusOptionsId;

export default resellerSlice.reducer;
