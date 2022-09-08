import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { UserType } from '../types/types';

type UserSliceType = {
  user: UserType | undefined;
  isShowLoginPopUp: boolean;
};

const initialState: UserSliceType = {
  user: undefined,
  isShowLoginPopUp: false,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = undefined;
    },
    showLoginPopUp: (state) => {
      state.isShowLoginPopUp = true;
    },
    hideLoginPopUp: (state) => {
      state.isShowLoginPopUp = false;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value += action.payload;
  //     })
  //     .addCase(incrementAsync.rejected, (state) => {
  //       state.status = 'failed';
  //     });
  // },
});

export const { resetUser, showLoginPopUp, hideLoginPopUp } = userSlice.actions;

export const selectorUser = (state: RootState) => state.user.user;
export const selectorUserIsShowLoginPopUp = (state: RootState) => state.user.isShowLoginPopUp;

export default userSlice.reducer;
