import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { UserType } from '../types/types';

type UserSliceType = {
  user: UserType | undefined;
};

const initialState: UserSliceType = {
  user: undefined,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = undefined;
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

export const { resetUser } = userSlice.actions;

export const selectorUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
